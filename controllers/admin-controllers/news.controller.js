import asyncHandler from '../../utils/AsyncHandler.js'
import Category from '../../models/category.model.js'
import News from '../../models/news.model.js'
import ApiError from '../../utils/ApiError.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const allNews = asyncHandler(async (req, res) => {
    const articles = await News.find().populate('category', 'name').populate('author', 'fullName');

    res.render('admin/articles/', { role: req.role, articles });
});

const addNewsPage = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    res.render('admin/articles/create', { role: req.role, categories });
});

const addNews = asyncHandler(async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new ApiError('Form data is missing');
        }
        if (!req.file) {
            throw new ApiError('Image file is required');
        }
        const { title, content, category } = req.body;
        const imagePath = req.file.filename;


        await News.create({
            title,
            content,
            category,
            image: imagePath,
            author: req.admin.userId
        });

        res.redirect('/admin/news');
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

const updateNewsPage = asyncHandler(async (req, res) => {
    const newsId = req.params.id;
    const newsItem = await News.findById(newsId).populate('category', 'name').populate('author', 'fullName');

    const categories = await Category.find();
    res.render('admin/articles/update', { role: req.role, newsItem: newsItem, categories });
});

const updateNews = asyncHandler(async (req, res) => {
    try {
        const newsId = req.params.id;
        const newsItem = await News.findById(newsId);

        if (!newsItem) {
            throw new ApiError(404, 'News item not found');
        }

        if (req.body.title) {
            newsItem.title = req.body.title;
        }
        if (req.body.content) {
            newsItem.content = req.body.content;
        }
        if (req.body.category) {
            newsItem.category = req.body.category;
        }
        if (req.file) {
            if (newsItem.image) {
                const imagePath = path.join(__dirname, '../../', 'public', 'uploads', newsItem.image);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image:', err);
                    }
                });
            }
            newsItem.image = req.file.filename;
        }

        await newsItem.save();

        res.redirect('/admin/news');
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

const deleteNews = asyncHandler(async (req, res) => {
    const newsId = req.params.id;
    const newsItem = await News.findById(newsId);
    if (!newsItem) {
        throw new ApiError(404, 'News item not found');
    }
    if (newsItem.image) {
        const imagePath = path.join(__dirname, '../../', 'public', 'uploads', newsItem.image);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image:', err);
            }
        });
    }
    await News.findByIdAndDelete(newsId);
    res.redirect('/admin/news');
});

export {
    allNews,
    addNewsPage,
    addNews,
    updateNewsPage,
    updateNews,
    deleteNews
};




