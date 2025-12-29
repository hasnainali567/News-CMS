import express from 'express';
import { allCategories, addCategoryPage, addCategory, updateCategoryPage, updateCategory, deleteCategory } from '../../controllers/admin-controllers/category.controller.js';
import isValid from '../../middlewares/validation.js'
const router = express.Router();

//category management routes
router.get('/', allCategories);
router.get('/add-category', addCategoryPage);
router.post('/add-category', isValid.categoryValidation, addCategory);
router.get('/update-category/:id', updateCategoryPage);
router.post('/update-category/:id', isValid.updateCategoryValidation, updateCategory);
router.delete('/delete-category/:id', deleteCategory);

export default router;