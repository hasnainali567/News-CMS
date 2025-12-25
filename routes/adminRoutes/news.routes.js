import express from 'express';
import { allNews, addNewsPage, addNews, updateNewsPage, updateNews, deleteNews } from '../../controllers/admin-controllers/news.controller.js';
import upload from '../../middlewares/multer.middleware.js';
const router = express.Router();

//news management routes

router.get('/', allNews);
router.get('/add-news',addNewsPage);
router.post('/add-news', upload.single('image'), addNews);
router.get('/update-news/:id', updateNewsPage);
router.post('/update-news/:id', upload.single('image'), updateNews);
router.get('/delete-news/:id', deleteNews);
export default router;