import express from 'express';
import { getAllNews, getNewsById, searchNews, getNewsByAuthor } from '../../controllers/newsController.js';
const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.get('/search', searchNews);
router.get('/author/:name', getNewsByAuthor);

export default router;