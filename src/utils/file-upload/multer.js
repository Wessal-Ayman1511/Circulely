import multer, { diskStorage } from "multer"
import { nanoid } from "nanoid"

export const fileUpload = () => {
    const storage = diskStorage({
        destination: 'uploads',
        filename: (req, file, cb) => {
            console.log(file)
            cb(null, nanoid() + file.originalname)
            console.log(file)
        }
    })

    return multer({storage})
}