import joi from 'joi'
import { generalFields } from '../../middlewares/validation.middleware.js'

/**
 * @params : postId
 * @body :  text
 * @file : attachment
 */

export const createComment = joi.object({
    postId: generalFields.id,
    attachment: generalFields.attachment,
    text: joi.string()
}).required().or('attachment', 'text')