import asyncHandler from '../../utils/AsyncHandler.js'
import Category from '../../models/category.model.js'
import News from '../../models/news.model.js'
import ApiError from '../../utils/ApiError.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { error } from 'console';
import { validationResult } from 'express-validator';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const allNews = asyncHandler(async (req, res) => {

    const role = req.role;
    let articles;
    if (role === 'admin') {
        articles = await News.find().populate('category', 'name').populate('author', 'fullName');
    } else {
        articles = await News.find({ author: req.admin.userId }).populate('category', 'name').populate('author', 'fullName');
    }
    res.render('admin/articles/', { role: req.role, articles });
});

const addNewsPage = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.render('admin/articles/create', { role: req.role, categories, errors: null });
});

const addNews = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    const categories = await Category.find();

    let errorMessages = [];

    if (req.uploadError) {
        errorMessages.push(req.uploadError);
    }
    if (!errors.isEmpty() || req.uploadError) {
        if (req.file) {
            fs.unlink(path.join(__dirname, '../../public/uploads', req.file.filename), (err) => {
                if (err) {
                    console.error('Error deleting file after validation failure:', err);
                }
            });
        }
        errorMessages = [...errorMessages, ...errors.array().map(err => err.msg)];
        return res.status(400).render('admin/articles/create', { role: req.role, categories, errors: errorMessages });
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
});

const updateNewsPage = asyncHandler(async (req, res) => {
    const newsId = req.params.id;
    const newsItem = await News.findById(newsId).populate('category', 'name').populate('author', 'fullName');

    if (!newsItem) {
        throw new ApiError(404, 'News item not found');
    }
    if (req.role !== 'admin' && newsItem.author._id.toString() !== req.admin.userId) {
        throw new ApiError(403, 'You do not have permission to edit this news item');
    }
    const categories = await Category.find();
    res.render('admin/articles/update', { role: req.role, newsItem: newsItem, categories, errors: null });
});

const updateNews = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    const categories = await Category.find();
    const newsItem = await News.findById(req.params.id);

    let errorMessages = [];

    // not found
    if (!newsItem) {
        errorMessages.push('News item not found');
    }

    // permission check (only if news exists)
    if (
        newsItem &&
        req.role !== 'admin' &&
        newsItem.author._id.toString() !== req.admin.userId
    ) {
        errorMessages.push('You do not have permission to edit this news item');
    }

    // multer error
    if (req.uploadError) {
        errorMessages.push(req.uploadError.message);
    }

    // validator errors
    if (!errors.isEmpty()) {
        errorMessages.push(
            ...errors.array().map(err => err.msg)
        );
    }

    // stop if any error
    if (errorMessages.length > 0) {
        if (req.file) {
            fs.unlink(path.join(__dirname, '../../public/uploads', req.file.filename), (err) => {
                if (err) {  
                    console.error('Error deleting file after validation failure:', err);
                }
            });
        }
        return res.status(400).render('admin/articles/update', {
            role: req.role,
            categories,
            newsItem,
            errors: errorMessages
        });
    }

    // update only provided fields
    Object.assign(newsItem, {
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.content && { content: req.body.content }),
        ...(req.body.category && { category: req.body.category })
    });

    // image update (optional)
    if (req.file) {
        if (newsItem.image) {
            fs.unlink(
                path.join(__dirname, '../../public/uploads', newsItem.image),
                () => { }
            );
        }
        newsItem.image = req.file.filename;
    }

    await newsItem.save();
    res.redirect('/admin/news');
});

const deleteNews = asyncHandler(async (req, res) => {

    const newsId = req.params.id;
    const newsItem = await News.findById(newsId);
    if (!newsItem) {
        throw new ApiError(404, 'News item not found');
    }
    if (req.role !== 'admin' && newsItem.author._id.toString() !== req.admin.userId) {
        throw new ApiError(403, 'You do not have permission to delete this news item');
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




