import { User } from "../../db/models/user.model.js";
import { decrypt } from "../../utils/index.js";
import { messages } from "../../utils/messages.js/index.js";
export const getProfile = async (req, res, next) => {
    const user = req.authUser
    user.phone = decrypt({data: user.phone})
    return res.status(200).json({
      success: true,
      data: user,
    });
};

export const freezeAccount = async(req, res, next) => {

  await User.updateOne({_id: req.authUser._id}, {isDeleted: true, deletedAt:Date.now()})

  return res.status(200).json({success: true, message: messages.user.deletedSuccessfully})

}

export const updateProfile = async(req, res, next) => {
  const {email, password} = req.body
  const existUser = await User.findById(req.authUser._id)
  if(!existUser) next(new Error(messages.user.notFound, {cause: 404}))
  existUser.password = password
  existUser.email = email 
  existUser.save()
  return res.status(200).json({success: true, message: messages.user.updatedSuccessfully})
}

export const uploadProfilePic = async(req, res, next) => {

  const updatedUser = await User.findByIdAndUpdate( 
    req.authUser.id,
    {
      profilePic: req.file.path
    },
    {
      new: true
    }
    
  )
  return res.status(200).json({success: true, user:updatedUser})

}

export const uploadCoverPic = async(req, res, nex) => {
  const coverPic = req.files.map((file) => file.path)
  const user = await User.findByIdAndUpdate(
    req.authUser.id,
    { coverPic},
    {new: true}
  )
  return res.status(200).json({success: true, message: "Cover Pic added successfully"})
}