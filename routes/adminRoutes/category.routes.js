import express from 'express';
import { AdminAuth } from '../../middlewares/adminAuth.middleware.js';
import { allCategories, addCategoryPage, addCategory, updateCategoryPage, updateCategory, deleteCategory } from '../../controllers/admin-controllers/category.controller.js';

const router = express.Router();

//category management routes
router.get('/', AdminAuth, allCategories);
router.get('/add-category', AdminAuth, addCategoryPage);
router.post('/add-category', AdminAuth, addCategory);
router.get('/update-category/:id', AdminAuth, updateCategoryPage);
router.post('/update-category/:id', AdminAuth, updateCategory);
router.get('/delete-category/:id', AdminAuth, deleteCategory);

export default router;