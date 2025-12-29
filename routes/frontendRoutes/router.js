import express from 'express';
import { addCommentToNews, getAllNews, getNewsByAuthor, getNewsByCategory, getNewsById, searchNews } from '../../controllers/frontend-controllers/site.controller.js';
import loadCommenData from '../../middlewares/loadCommonData.js';

const router = express.Router();

router.use(loadCommenData)
router.get('/', getAllNews);
router.get('/single/:id', getNewsById);
router.get('/categories/:slug', getNewsByCategory);
router.get('/search', searchNews);
router.get('/authors/:authorId', getNewsByAuthor);
router.post('/add-comment/:id', addCommentToNews);
export default router;