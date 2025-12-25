import asyncHandler from "../utils/AsyncHandler.js";

const adminMiddleware = asyncHandler(async (req, res, next) => {
    if (!req.role || req.role !== 'admin') {
        return res.redirect('/admin/dashboard');
    }
    next();
});

export default adminMiddleware;