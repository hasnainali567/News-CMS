import express from 'express';

const router = express.Router();
router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.get('/category/:category', getNewsByCategory);
router.get('/search', searchNews);
router.get('/authors/:authorId', getNewsByAuthor);
router.post('/:id/add-comment', addCommentToNews);

export default router;