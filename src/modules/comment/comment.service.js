import { Comment } from "../../db/models/comment.model.js"
import { Post } from "../../db/models/post.model.js"
import cloudinary from "../../utils/file-upload/cloud-config.js"
import { messages } from "../../utils/messages.js/index.js"


export const createComment = async(req, res, next) => {
    const {text} = req.body
    const {postId} = req.params

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
        text
    })
    return res.status(201).json({success: true, data: comment})

}