import path from "path";
import { defalutSecureUrl, defaultProfilePic, defaultPublicId, User } from "../../db/models/user.model.js";
import { decrypt } from "../../utils/index.js";
import { messages } from "../../utils/messages.js/index.js";
import fs from 'fs'
import cloudinary from "../../utils/file-upload/cloud-config.js";
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

  const fullPath = path.resolve(req.authUser.profilePic)

  if(fs.existsSync(fullPath) && req.authUser.profilePic != defaultProfilePic)
  {
    fs.unlinkSync(fullPath)
  } 


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

export const uploadProfilePicCloud = async(req, res, next) => {
  // delete old image if found > upload to cloud > update database
  const options = {}
  if (req.authUser.profilePic.public_id == defaultPublicId)
    options.folder = `circlely/users/${req.authUser._id}/profile_pic`
  else 
    options.public_id = req.authUser.profilePic.public_id

  const {secure_url, public_id} = await cloudinary.uploader.upload(
    req.file.path,
    options
  )

  const user = await User.findByIdAndUpdate(
    req.authUser._id,
    {profilePic: {secure_url, public_id}},
    {new: true}
  )
  return res.status(200).json({success: true, message: messages.user.updatedSuccessfully, data: user})


}
export const deleteProfilePic = async(req, res, next) => {
  // delete image from the server
  const fullPath = path.resolve(req.authUser.profilePic)
  if(fs.existsSync(fullPath) && defaultProfilePic != req.authUser.profilePic){
    fs.unlinkSync(fullPath)
  }
  // delete it from the db
  const updatedUser = await User.findByIdAndUpdate(
    req.authUser.id,
    {profilePic: defaultProfilePic},
    {new: true}
  )
  return res.status(200).json({success: true, message: "profile picture deleted successfully!", data:updatedUser})
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