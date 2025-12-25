import asyncHandler from '../../utils/AsyncHandler.js';
import ApiError from '../../utils/ApiError.js';
import Category from '../../models/category.model.js';


const allCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    res.render('admin/categories/', { role: req.role, categories });
});

const addCategoryPage = asyncHandler(async (req, res) => {
    res.render('admin/categories/create', { role: req.role });
});

const addCategory = asyncHandler(async (req, res) => {

    if (!req.body || !req.body.name || req.body.name.trim() === '') {
        throw new ApiError(400, 'Category name is required');
    }
    const { name, description } = req.body;
    const existingCategory = await Category.findOne({ name: name.trim() }).lean();
    if (existingCategory) {
        throw new ApiError(400, 'Category with this name already exists');
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
    res.render('admin/categories/update', { role: req.role, category });
});

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!req.body || !req.body.name || req.body.name.trim() === '') {
        throw new ApiError(400, 'Category name is required');
    }

    const { name, description } = req.body;
    await Category.findByIdAndUpdate(id, {
        name: name.trim(),
        description
    });
    res.redirect('/admin/categories');

});

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.redirect('/admin/categories');
});

export {
    allCategories,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
};
