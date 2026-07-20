import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import * as chatServices from './chat.service.js'
import { asyncHandler } from "../../utils/index.js";

const router = Router()

router.post('/send', isAuthenticated, asyncHandler(chatServices.sendMessage))
router.get('/:friendId', isAuthenticated, asyncHandler(chatServices.getChat))



export default router 