import multer, { diskStorage } from "multer"
import { nanoid } from "nanoid"
import fs from 'fs'
import path from "path"

export const fileValidation = {
    images: ['image/png', 'image/jpeg'],
    files: ['application/pdf', 'application/msword'],
    videos: ['video/mp4']
}

export const cloudUpload = (allowedTypes) => {
    try {
        const storage = diskStorage({})

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