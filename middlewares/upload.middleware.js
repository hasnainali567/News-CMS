import asyncHandler from "../utils/AsyncHandler.js";
import upload from "./multer.middleware.js";

const uploadMiddleware = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.log(err);
            
            req.uploadError = err.message;
        }
        next();
    })
};

export default uploadMiddleware;