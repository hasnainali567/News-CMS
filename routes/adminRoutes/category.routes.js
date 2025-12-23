import express from 'express';
import { allCategories, addCategoryPage, addCategory, updateCategoryPage, updateCategory, deleteCategory } from '../../controllers/admin-controllers/category.controller.js';

const router = express.Router();

//category management routes
router.get('/', allCategories);
router.get('/add-category', addCategoryPage);
router.post('/add-category', addCategory);
router.get('/update-category/:id', updateCategoryPage);
router.post('/update-category/:id', updateCategory);
router.get('/delete-category/:id', deleteCategory);

export default router;