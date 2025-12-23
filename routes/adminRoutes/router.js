import { Router } from "express";
import { allComments } from "../../controllers/admin-controllers/comment.controller.js";
import AdminAuth from "../../middlewares/AdminAuth.js";
import userRouter from './user.routes.js';
import categoryRouter from './category.routes.js';
import newsRouter from './news.routes.js';

const router = Router();

router.use(AdminAuth);
router.use('/', userRouter);

//category management routes
router.use('/categories', categoryRouter);

//news management routes
router.use('/news', newsRouter);

//comment routes
router.get('/comments', AdminAuth, allComments);


export default router;