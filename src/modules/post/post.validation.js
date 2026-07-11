import joi from 'joi'
import { generalFields, isValidId } from '../../middlewares/validation.middleware.js'

export const createPost = joi.object({
    content: joi.string(),
    attachment: joi.array().items(generalFields.attachment)
})
.or('content', 'attachment')
.required()

export const likeOrUnlike = joi.object({
    id: generalFields.id.required()
}).required()

export const getPost = joi.object({
    id: generalFields.id.required()
}).required()

export const hardDeletePost = joi.object({
    id: generalFields.id.required()
}).required()

export const archivePost = joi.object({
    id: generalFields.id.required()
}).required()

export const restorePost = joi.object({
    id: generalFields.id.required()
}).required()