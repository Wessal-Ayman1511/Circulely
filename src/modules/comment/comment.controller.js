import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { isAuthorized } from "../../middlewares/authorization.js";
import { roles } from "../../db/models/user.model.js";
import { cloudUpload, fileValidation } from "../../utils/file-upload/multer_cloud.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import * as commentValidations from './comment.validation.js'
import * as commentServices from './comment.service.js'
import { asyncHandler } from "../../utils/index.js";

const router = Router({mergeParams: true})

// create comment
// related to post
// child to parent
// add comment ->  /post/postId/comment/

router.post('/',
    isAuthenticated,
    isAuthorized(roles.USER),
    cloudUpload(fileValidation.images).single('attachment'),
    isValid(commentValidations.createComment),
    asyncHandler(commentServices.createComment)
 
)

router.get('/',
    isAuthenticated,
    isAuthorized(roles.USER),
    isValid(commentValidations.getComments),
    asyncHandler(commentServices.getComments)

)


export default router;