import express from 'express';
import { AdminAuth } from '../../middlewares/adminAuth.middleware.js';
import { allNews, addNewsPage, addNews, updateNewsPage, updateNews, deleteNews } from '../../controllers/admin-controllers/news.controller.js';
const router = express.Router();

//news management routes

router.get('/news', AdminAuth, allNews);
router.get('/add-news', AdminAuth, addNewsPage);
router.post('/add-news', AdminAuth, addNews);
router.get('/update-news/:id', AdminAuth, updateNewsPage);
router.post('/update-news/:id', AdminAuth, updateNews);
router.get('/delete-news/:id', AdminAuth, deleteNews);

export default router;