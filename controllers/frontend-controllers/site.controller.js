import asyncHandler from "../../utils/AsyncHandler.js";

const getAllNews = asyncHandler(async (req, res) => {
    res.render('index');
});

const getNewsById = asyncHandler(async (req, res) => {
    res.render('single');
});

const getNewsByCategory = asyncHandler(async (req, res) => {
    res.render('category');
});

const searchNews = asyncHandler(async (req, res) => {
    res.render('search');
});

const getNewsByAuthor = asyncHandler(async (req, res) => {
    res.render('author');
});

const addCommentToNews = asyncHandler(async (req, res) => {
    // res.render
});
export {
    getAllNews,
    getNewsById,
    getNewsByCategory,
    searchNews,
    getNewsByAuthor,
    addCommentToNews
}

