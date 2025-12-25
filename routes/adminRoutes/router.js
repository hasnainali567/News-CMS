import { Router } from "express";
import { allComments } from "../../controllers/admin-controllers/comment.controller.js";
import userRouter from './user.routes.js';
import categoryRouter from './category.routes.js';
import newsRouter from './news.routes.js';
import settingRouter from './setting.routes.js';
import authMiddleware from "../../middlewares/auth.middleware.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";

const router = Router();

router.use('/', userRouter);

router.use(authMiddleware);

//category management routes
router.use('/categories', adminMiddleware, categoryRouter);

//news management routes
router.use('/news', newsRouter);

//comment routes
router.get('/comments', allComments);

router.use('/settings', adminMiddleware, settingRouter);


export default router;