import { Router } from "express";
import * as userServices from './user.service.js'
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/index.js";
import { fileUpload, fileValidation } from "../../utils/file-upload/multer.js";
const router = Router()

router.get('/profile', isAuthenticated, userServices.getProfile)
router.delete('/freeze', isAuthenticated, userServices.freezeAccount)
router.put('/update', isAuthenticated, asyncHandler(userServices.updateProfile))
router.post('/profile-pic', isAuthenticated, fileUpload(fileValidation.images, 'uploads/users').single('image'),asyncHandler(userServices.uploadProfilePic))
router.delete('/profile-pic', isAuthenticated, asyncHandler(userServices.deleteProfilePic))
router.post('/cover-pic', isAuthenticated, fileUpload(fileValidation.images, 'uploads/users').array('images', 5), asyncHandler(userServices.uploadCoverPic))
router.delete('/profile-pic', isAuthenticated, asyncHandler(userServices.deleteProfilePic))
export default router