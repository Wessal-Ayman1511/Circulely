import multer, { diskStorage } from "multer"
import { nanoid } from "nanoid"
import fs from 'fs'
import path from "path"

export const fileValidation = {
    images: ['image/png', 'image/jpeg'],
    files: ['application/pdf', 'application/msword'],
    videos: ['video/mp4']
}

export const fileUpload = (allowedTypes, folder) => {
    try {
        const storage = diskStorage({
        destination: (req, file, cb) => {
            const fullPath = path.resolve(`${folder}/${req.authUser.id}`)
            fs.mkdirSync(fullPath, {recursive:true})
            return cb(null,`${folder}/${req.authUser.id}`)

        },
        filename: (req, file, cb) => {
            cb(null, nanoid() + file.originalname)
        }
    })

    const fileFilter = (req, file, cb) => {
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("invalid file format!😡"))
        }
        return cb(null, true)
    }  

    return multer({storage, fileFilter})
        
    } catch (error) {
        console.log(error.message)
        
    }
}