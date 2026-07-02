import { Router } from "express";
import * as authServices from './auth.service.js'
import { asyncHandler } from "../../utils/error/async-handler.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import * as authValidations from './auth.validation.js'

const router = Router()

router.post('/send-otp', isValid(authValidations.sendOTP), asyncHandler(authServices.sendOTP))
router.post('/register', isValid(authValidations.register),asyncHandler(authServices.register))
router.post('/login',isValid(authValidations.login) ,asyncHandler(authServices.login))
router.post('/google-login', isValid(authValidations.googleLogin), asyncHandler(authServices.googleLogin))
router.get('/activate-account/:token', asyncHandler(authServices.activateAccount))
router.post('/refresh-token', isValid(authValidations.refreshToken), authServices.refreshToken)



export default router