import express from 'express';

const router = express.Router();


router.get('/comments/:newsId', getCommentsByNewsId);
router.post('/comments/:newsId', postCommentToNewsId);
router.put('/comments/:commentId', updateCommentById);
router.delete('/comments/:commentId', deleteCommentById);

export default router;