import express from 'express';
import { allNews, addNewsPage, addNews, updateNewsPage, updateNews, deleteNews } from '../../controllers/admin-controllers/news.controller.js';
import upload from '../../middlewares/multer.middleware.js';
import uploadMiddleware from '../../middlewares/upload.middleware.js';
const router = express.Router();
import isValid from '../../middlewares/validation.js'

//news management routes

router.get('/', allNews);
router.get('/add-news',  addNewsPage);
router.post('/add-news', uploadMiddleware, isValid.newsValidation,addNews);
router.get('/update-news/:id', updateNewsPage);
router.post('/update-news/:id', uploadMiddleware, isValid.newsValidation, updateNews);
router.delete('/delete-news/:id', deleteNews);
export default router;