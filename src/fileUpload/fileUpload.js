import multer from "multer"
import { v4 as uuidv4 } from 'uuid'
import { appError } from "../utils/appError.js"
import cloudinaryUpload from "./cloudinary.js"



export const fileUpload = (fieldName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/')
        },
        filename: (req, file, cb) => {
            const  generatedFilename = uuidv4() + "-" + file.originalname;
            cb(null, generatedFilename)
        }
    })
    function fileFilter(req, file, cb) {
        
        if (file.mimetype.startsWith('application')) {
            cb(null, true)
        }
        else {
            cb(new appError("PDF only", 401), false)
        }
    }
    const upload = multer({ storage, fileFilter })
    return upload.single(fieldName)

}