import asyncHandler from "../../utils/AsyncHandler.js";

const allComments = asyncHandler(async (req, res) => {
    res.render('admin/comments/');
});

export {
    allComments
}