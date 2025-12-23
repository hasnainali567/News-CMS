import express from 'express';
import newsRoutes from './news.routes.js';
import commentsRoutes from './comments.routes.js';
import categoryRoutes from './category.routes.js';

const router = express.Router();
router.use('/news', newsRoutes);
router.use('/comments', commentsRoutes);
router.use('/categories', categoryRoutes);

export default router;