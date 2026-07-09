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

router.post('/',
    isAuthenticated,
    isAuthorized(roles.USER),
    cloudUpload(fileValidation.images).single('attachment'),
    isValid(commentValidations.createComment),
    asyncHandler(commentServices.createComment)
   
)



export default router;