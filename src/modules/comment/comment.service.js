import { Comment } from "../../db/models/comment.model.js"
import { Post } from "../../db/models/post.model.js"
import cloudinary from "../../utils/file-upload/cloud-config.js"
import { messages } from "../../utils/messages.js/index.js"


export const createComment = async(req, res, next) => {
    const {text} = req.body
    const {postId} = req.params
    const {id} = req.query

    // check if post exist > prepare data for creating post(postId, text, attachment, user) > create

    const post = await Post.findById(postId)
    if(!post) return next(new Error(messages.post.notFound, {cause: 404}))

    let attachment = {}
    if(req.file) {
        const {secure_url, public_id} = await cloudinary.uploader.upload(
            req.file.path,
            {folder: `circlely/users/${req.authUser._id}/posts/comments`}
        )
        attachment = {secure_url, public_id}
    }

    const comment = await Comment.create({
        post: postId,
        user: req.authUser._id,
        attachment,
        text,
        parentId: id
    })
    return res.status(201).json({success: true, data: comment})

}

export const getComments = async(req, res, next) => {
    const {postId} = req.params
    const {id} = req.query

    const comments = await Comment.find({post: postId, parentId: id}).populate([
        {path: 'user', select: 'profilePic.secure_url userName'},
        {path: 'likes', select: 'profilePic.secure_url userName'},
        {path: 'post', populate: [{path: 'publisher', select: 'userName profilePic.secure_url'}]},


    ])
    return res.status(200).json({success: true, data:comments})
}


export const deleteComment = async(req, res, next) => {
    // check existance of comment >
    //  check if user is publisher and who write post
    // delete attachment of this comment from cloud
    // delete comment
    // delte its related replies
    const {id, postId} = req.params

    const comment = await Comment.findById(id).populate([
        {path: 'post', select: 'publisher'},
    ])
    if(!comment) return next(new Error(messages.comment.notFound, {cause: 404}))

    if (![comment.post.publisher.toString(), comment.user.toString()].includes(req.authUser._id.toString()))
    {
        return next(new Error('You are not allowed!😡', {cause: 401}))
    }

    if (comment.attachment.public_id) 
        await cloudinary.uploader.destroy(comment.attachment.public_id)
    await comment.deleteOne() // deletes replies delted in hooks

    return res.status(201).json({success: true, message: messages.comment.deletedSuccessfully})
}