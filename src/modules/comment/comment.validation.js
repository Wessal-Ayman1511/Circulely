import joi from 'joi'
import { generalFields } from '../../middlewares/validation.middleware.js'

/**
 * @params : postId & id
 * @query : id
 * @body :  text
 * @file : attachment
 */

export const createComment = joi.object({
    id: generalFields.id,
    postId: generalFields.id.required(),
    attachment: generalFields.attachment,
    text: joi.string()
}).required().or('attachment', 'text')

/**
 * @params postId & id of comment
 */
export const getComments = joi.object({
    id: generalFields.id,
    postId: generalFields.id.required(),
}).required()

export const deleteComment = joi.object({
    id: generalFields.id.required(),
    postId: generalFields.id.required(),
}).required()