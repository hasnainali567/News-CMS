import asyncHandler from '../../utils/AsyncHandler.js';
import ApiError from '../../utils/ApiError.js';
import Category from '../../models/category.model.js';
import News from '../../models/news.model.js';
import { validationResult } from 'express-validator';


const allCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    res.render('admin/categories/', { role: req.role, categories });
});

const addCategoryPage = asyncHandler(async (req, res) => {
    res.render('admin/categories/create', { role: req.role, errors: null });
});

const addCategory = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    let errorMessages = [];
    const name = req.body.name || '';
    const description = req.body.description || '';

    const existingCategory = await Category.findOne({ name: name.trim() }).lean();
    if (existingCategory) {
        errorMessages.push('Category name already exists');
    }

    if (!errors.isEmpty() || errorMessages.length > 0) {
        errorMessages = [...errorMessages, ...errors.array().map(err => err.msg)];
        return res.status(400).render('admin/categories/create', { role: req.role, errors : errorMessages });
    }

    await Category.create({
        name: name.trim(),
        description
    });
    res.redirect('/admin/categories');
});

const updateCategoryPage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        throw new ApiError(404, 'Category not found');
    }
    res.render('admin/categories/update', { role: req.role, category, errors: null });
});

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const errors = validationResult(req);
    let errorMessages = [];

    const existingCategory = await Category.findOne({ name: req.body.name.trim(), _id: { $ne: id } }).lean();
    if (existingCategory) {
        errorMessages.push('Category name already exists');
    }

    if (!errors.isEmpty() || errorMessages.length > 0) {
        errorMessages = [...errorMessages, ...errors.array().map(err => err.msg)];
        const category = await Category.findById(id);
        return res.status(400).render('admin/categories/update', { role: req.role, category, errors : errorMessages });
    }

    const category = await Category.findById(id)

    if (!category) {
        throw new ApiError(404, 'Category not Found');
    }

    Object.assign(category, {
        ...(req.body.name && { name: req.body.name.trim() }),
        ...(req.body.description && { description: req.body.description })
    })

    await category.save();
    
    res.redirect('/admin/categories');

});

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const news = await News.find({ category: id });
    if (news.length > 0) {
        // throw new ApiError(400, 'Cannot delete category with associated news articles');
        return res.status(400).send('Cannot delete category with associated news articles');
    }
    await Category.findByIdAndDelete(id);
    // res.redirect('/admin/categories');
    res.status(200).send('Category deleted successfully');
});

export {
    allCategories,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
};
