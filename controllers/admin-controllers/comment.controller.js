import asyncHandler from "../../utils/AsyncHandler.js";

const allComments = asyncHandler(async (req, res) => {
    res.render('admin/comments/', { role : req.role});
});

export {
    allComments
}