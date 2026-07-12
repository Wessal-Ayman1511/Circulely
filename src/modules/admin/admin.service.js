import { Post } from "../../db/models/post.model.js"
import { roles, User } from "../../db/models/user.model.js"
import { messages } from "../../utils/messages.js/index.js"


export const getAllData = async(req, res, next) => {
    const results = await Promise.all([User.find(), Post.find()])
    return res.status(200).json({success: true, data: results})
}

export const updateRole = async(req, res, next) => {
    // role or logged in user, role of target user, check logedrole > 
    const {role, userId} = req.body

    const targetUser = await User.findById(userId).select('role')
    const targetUserRole = targetUser.role
    const loggedInUserRole = req.authUser.role

    const rolesHeirarchy = Object.values(roles)
    const targetUserRoleIndex = rolesHeirarchy.indexOf(targetUserRole)
    const loggedInUserRoleIndex = rolesHeirarchy.indexOf(loggedInUserRole)
    const targetRoleIndex = rolesHeirarchy.indexOf(role)

    if(loggedInUserRoleIndex < targetUserRoleIndex){
        return next(new Error("You Aren't Allowed!😡", {cause: 401}))
    }
    if (targetRoleIndex > loggedInUserRoleIndex)
    {
        return next(new Error("You Aren't Allowed!😡", {cause: 401}))
    }
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {role, updatedBy: req.authUser._id},
        {new: true}
    )
    return res.status(200).json({success: true, message: messages.user.updatedSuccessfully, data:updatedUser})
}