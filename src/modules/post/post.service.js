import { Post } from "../../db/models/post.model.js"
import cloudinary from "../../utils/file-upload/cloud-config.js"
import { messages } from "../../utils/messages.js/index.js"




export const createPost = async(req, res, next) => {
    const {content} = req.body
    // handle uploads then update database
    const attachment = []
    for(const file of req.files){
        const {secure_url, public_id} = await cloudinary.uploader.upload(
            file.path,
            {folder: `circlely/users/${req.authUser._id}/posts`}
        )
        attachment.push({secure_url, public_id})
    }
    const post = await Post.create({content, attachment, publisher:req.authUser._id})
    return res.status(200).json({success: true, message: messages.post.createdSuccessfully, data: post})

}

export const likeOrUnlike = async(req, res, next) => {
    // check if post exist > if exist check if user in the likes or not > if not add if exist remove
    const {id} = req.params

    const post = await Post.findById(id)
    if (!post) next(new Error(messages.post.notFound, {cause: 404}))

    const userIndex = post.likes.indexOf(req.authUser._id)
    if (userIndex == -1) post.likes.push(req.authUser._id)
    else post.likes.splice(req.authUser._id, 1)

    const updatedPost = await post.save()
    return res.status(200).json({success: true, data: updatedPost})
    

}

export const getPosts = async(req, res, next) => {
    const posts = await Post.find({isDeleted: false}).populate([
        {path: 'publisher', select: 'userName profilePic.secure_url'},
        {path: 'likes', select: 'userName profilePic.secure_url'},
        {path: 'comments', populate: [{path: 'user', select: "userName"}]}
    ])

    // const posts = await Post.aggregate([
    //     {
    //         $lookup: {
    //             from: 'users',
    //             localField: 'publisher',
    //             foreignField: '_id',
    //             as: "publisher"
    //         }
    //     },
    //     {
    //         $unwind: '$publisher'
    //     },
    //     {
    //         $lookup: {
    //             from: 'users',
    //             localField: "likes",
    //             foreignField: "_id",
    //             as: "likes"
    //         }
    //     },
    //     {
    //         $project: {
    //             'attachment.secure_url': 1,
    //             'content': 1,
    //             'publisher.userName': 1,
    //             'publisher.profilePic.secure_url': 1,
    //             'likes.userName': 1,
    //             'likes.profilePic.secure_url': 1
    //         }

    //     }
    // ])
    return res.status(200).json({success: true, data: posts})
}

export const getPost = async(req, res, next) => {
    const {id} = req.params
    const post = await Post.findOne(
        {
            _id: id,
            isDeleted: false
        }
    ).populate([
        {path: 'publisher', select: 'userName profilePic.secure_url'},
        {path: 'likes', select: 'userName profilePic.secure_url'},
        {path: 'comments', match: {parentId: {$exists: false}}}
    ])
    if(!post) return next(new Error(messages.post.notFound, {cause: 404}))
    return res.status(200).json({success: true, data: post})
}

export const hardDeletePost = async(req, res, next) => {
    // find post > check that u r the owner >delete its attachments > delete its comments
    const {id} = req.params
    const post = await Post.findOne({
        _id: id,
        publisher: req.authUser._id
    }).populate([
        {path: 'comments', match: {parentId: {$exists: false}}}
    ])
    // check existance of post and if the ownere delete it
    if(!post) return next(new Error(messages.post.notFound, {cause: 404}))
    // delete post attachments
    for (const file of post.attachment) {
        await cloudinary.uploader.destroy(file.public_id)    
    }
    // delte attachments of comments
    for (const comment of post.comments) {
        if(comment.attachment.public_id)
            await cloudinary.uploader.destroy(comment.attachment.public_id)
        await comment.deleteOne()     
    }
    await post.deleteOne()

    return res.status(200).json({success: true, message: messages.post.deletedSuccessfully})
}


export const archivePost = async(req, res, next) => {
    const {id} = req.params

    const post = await Post.findOneAndUpdate({
        _id: id,
        publisher: req.authUser._id,
        isDeleted: false
    }, {
        isDeleted: true
    })
    if(!post) return next(new Error(messages.post.notFound, {cause: 404}))
    return res.status(200).json({success: true, message: 'Post Archived successfully!'})
        
}

export const restorePost = async(req, res, next) => {
    const {id} = req.params

    const post = await Post.findOneAndUpdate({
        _id: id,
        publisher: req.authUser._id,
        isDeleted: true
    }, {
        isDeleted: false
    })
    if(!post) return next(new Error(messages.post.notFound, {cause: 404}))
    return res.status(200).json({success: true, message: 'Post Restored successfully!'})
        
}