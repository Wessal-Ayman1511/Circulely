import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { isAuthorized } from "../../middlewares/authorization.js";
import { roles } from "../../db/models/user.model.js";
import { cloudUpload, fileValidation } from "../../utils/file-upload/multer_cloud.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import * as postValidation from './post.validation.js'
import * as postServices from './post.service.js'
import { asyncHandler } from "../../utils/error/async-handler.js";
import commentRouter from '../comment/comment.controller.js'

const router = Router()


router.use('/:postId/comment', commentRouter)

router.post('/',
    isAuthenticated,
    isAuthorized(roles.USER),
    cloudUpload(fileValidation.images).array('attachment', 5),
    isValid(postValidation.createPost),
    asyncHandler(postServices.createPost)
)

router.patch('/like-unlike/:id',
    isAuthenticated,
    isAuthorized(roles.USER),
    isValid(postValidation.likeOrUnlike),
    asyncHandler(postServices.likeOrUnlike)
)

router.get('/',
    isAuthenticated,
    isAuthorized(roles.USER),
    asyncHandler(postServices.getPosts)
)

export default router