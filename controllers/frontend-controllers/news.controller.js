import mongoose from "mongoose";
import asyncHandler from "../../utils/AsyncHandler.js";

const getAllNews = asyncHandler(async (req, res) => {
    // Your logic to get all news
});
const getNewsById = asyncHandler(async (req, res) => {
    // Your logic to get news by ID
});
const searchNews = asyncHandler(async (req, res) => {
    // Your logic to search news
});

const getNewsByAuthor = asyncHandler(async (req, res) => {
    // Your logic to get news by author
});

export {
    getAllNews,
    getNewsById,
    searchNews,
    getNewsByAuthor
};



// router.get('/', getAllNews);
// router.get('/:id', getNewsById);
// router.get('/search', searchNews);
// router.get('/author/:name', getNewsByAuthor);