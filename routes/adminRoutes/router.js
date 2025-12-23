import { Router } from "express";
import { allComments } from "../../controllers/admin-controllers/comment.controller.js";
import userRouter from './user.routes.js';
import categoryRouter from './category.routes.js';
import newsRouter from './news.routes.js';
import settingRouter from './setting.routes.js';

const router = Router();

router.use('/', userRouter);

//category management routes
router.use('/categories', categoryRouter);

//news management routes
router.use('/news', newsRouter);

//comment routes
router.get('/comments', allComments);

router.use('/settings', settingRouter);


export default router;