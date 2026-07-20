import joi from 'joi'
import { generalFields } from '../../middlewares/validation.middleware.js'

export const sendRequest = joi.object({
    friendId: generalFields.id.required()
}).required()

export const acceptRequest = joi.object({
    friendId: generalFields.id.required()
}).required()