import { Router } from "express";
import * as userServices from './user.service.js'
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/index.js";
import { fileUpload } from "../../utils/file-upload/multer.js";
const router = Router()

router.get('/profile', isAuthenticated, userServices.getProfile)
router.delete('/freeze', isAuthenticated, userServices.freezeAccount)
router.put('/update', isAuthenticated, asyncHandler(userServices.updateProfile))
router.post('/profile-pic', isAuthenticated, fileUpload().single('image'),asyncHandler(userServices.uploadProfilePic))

export default router