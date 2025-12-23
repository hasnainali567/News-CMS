import asyncHandler from '../../utils/AsyncHandler.js';
import ApiError from '../../utils/ApiError.js';
import ApiResponse from '../../utils/ApiResponse.js';


const allCategories = asyncHandler(async (req, res) => {
    // Your logic to get all categories
});

const addCategoryPage = asyncHandler(async (req, res) => {
    // Your logic to render add category page
});

const addCategory = asyncHandler(async (req, res) => {
    // Your logic to add a new category
});

const updateCategoryPage = asyncHandler(async (req, res) => {
    // Your logic to render update category page
});

const updateCategory = asyncHandler(async (req, res) => {
    // Your logic to update a category
});

const deleteCategory = asyncHandler(async (req, res) => {
    // Your logic to delete a category
});

export {
    allCategories,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
};
