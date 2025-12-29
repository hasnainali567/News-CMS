import asyncHandler from "../../utils/AsyncHandler.js";
import News from '../../models/news.model.js'
import Category from "../../models/category.model.js";
import mongoose from "mongoose";
import paginate from "../../utils/paginate.js";
const getAllNews = asyncHandler(async (req, res) => {
    // const news = await News.find()
    //     .populate('category', { name: 1, slug: 1 })
    //     .populate('author', 'fullName')
    //     .sort({ createdAt: -1 })

    const { data: news, pagination } = await paginate(News, {}, req.query, {}, {
        populate: [
            { path: 'category', select: 'name slug' },
            { path: 'author', select: 'fullName' }
        ],
        sort: { createdAt: -1 }
    });

    res.render('index', { news, pagination });
});

const getNewsById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const { data: singleNews, pagination } = await paginate(News, { _id: id }, req.query, {
        populate: [
            { path: 'category', select: 'name slug' },
            { path: 'author', select: 'fullName' },
        ],
        sort: { createdAt: -1 }
    });
    console.log(singleNews);

    res.render('single', { singleNews: singleNews[0], pagination });
});

const getNewsByCategory = asyncHandler(async (req, res) => {
    const slug = req.params.slug;

    const category = await Category.findOne({ 'slug': slug });

    if (!category) {
        return res.status(404).send('category not found')
    }

    const { data: news, pagination } = await paginate(News, { category: category._id }, req.query, {
        populate: [
            { path: 'category', select: 'name slug' },
            { path: 'author', select: 'fullName' },
        ],
        sort: { createdAt: -1 }
    });

    res.render('category', { news, category: category.name, pagination });
});

const searchNews = asyncHandler(async (req, res) => {
    const search = req.query.search;

    const { data: news, pagination } = await paginate(News, {
        $or: [
            {
                title: { $regex: search, $options: 'i' }
            },
            {
                content: { $regex: search, $options: 'i' }
            }
        ]
    }, req.query, {
        populate: [
            { path: 'category', select: 'name slug' },
            { path: 'author', select: 'fullName' },
        ],
        sort: { createdAt: -1 }
    });

    res.render('search', { news, search, pagination });
});

const getNewsByAuthor = asyncHandler(async (req, res) => {
    const author = new mongoose.Types.ObjectId(req.params.authorId);

    const { data: news, pagination } = await paginate(News, { author }, req.query, {
        populate: [
            { path: 'category', select: 'name slug' },
            { path: 'author', select: 'fullName' },
        ],
        sort: { createdAt: -1 }
    });

    res.render('author', { news, author: news[0].author.fullName });
});

const addCommentToNews = asyncHandler(async (req, res) => {
    const comment = req.body
    const newsId = req.params.id;

    const news = await News.findById(newsId);
    if (!news) {
        return res.status(404).send('News not found');
    }

    const newComment = new Comment({
        news: newsId,
        user: req.user.userId,
        content: comment.content
    });

    try {
        await newComment.save();
        res.status(201).send('Comment added successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});
export {
    getAllNews,
    getNewsById,
    getNewsByCategory,
    getNewsByAuthor,
    addCommentToNews,
    searchNews
}

