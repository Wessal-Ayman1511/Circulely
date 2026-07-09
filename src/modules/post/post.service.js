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
    const post = await Post.create({content, attachment, publisherId:req.authUser._id})
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
    const posts = await Post.find().populate([
        {path: 'publisher', select: 'userName profilePic.secure_url'},
        {path: 'likes', select: 'userName profilePic.secure_url'}
    ])
    return res.status(200).json({success: true, data: posts})
}