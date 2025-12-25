import jwt from "jsonwebtoken";
import asyncHandler from "../utils/AsyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.adminId;
    if (!token) {
        return res.redirect('/admin/');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.admin = decoded;
        req.role = decoded.role;
        next();
    } catch (error) {
        return res.redirect('/admin/');
    }
});

export default authMiddleware;