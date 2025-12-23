import asyncHandler from '../../utils/AsyncHandler.js'

const allNews = asyncHandler(async (req, res) => {
    res.render('admin/articles/');
});

const addNewsPage = asyncHandler(async (req, res) => {
    res.render('admin/articles/create');
});

const addNews = asyncHandler(async (req, res) => {
    //
});

const updateNewsPage = asyncHandler(async (req, res) => {
    res.render('admin/articles/update');
});

const updateNews = asyncHandler(async (req, res) => {
    //
});

const deleteNews = asyncHandler(async (req, res) => {
    //
});

export {
    allNews,
    addNewsPage,
    addNews,
    updateNewsPage,
    updateNews,
    deleteNews
};




