import express from 'express';
import { allNews, addNewsPage, addNews, updateNewsPage, updateNews, deleteNews } from '../../controllers/admin-controllers/news.controller.js';
const router = express.Router();

//news management routes

router.get('/', allNews);
router.get('/add-news', addNewsPage);
router.post('/add-news', addNews);
router.get('/update-news/:id', updateNewsPage);
router.post('/update-news/:id', updateNews);
router.get('/delete-news/:id', deleteNews);

export default router;