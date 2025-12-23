import express from 'express';
import { addCommentToNews, getAllNews, getNewsByAuthor, getNewsByCategory, getNewsById, searchNews } from '../../controllers/frontend-controllers/site.controller.js';

const router = express.Router();
router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.get('/categories/:category', getNewsByCategory);
router.get('/search/:search', searchNews);
router.get('/authors/:authorId', getNewsByAuthor);
router.post('/:id/add-comment', addCommentToNews);
export default router;