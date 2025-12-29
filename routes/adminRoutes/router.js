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

//404 middleware 

router.use((req, res, next) => {
    const role = req.role || 'author';
    res.status(404).render('admin/404', { role: role, error: 'Page not found' });
});


//500 middleware
router.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const view = errorStatus === 404 ? 'admin/404' : 'admin/500';
    const role = req.role || 'author';
    res.status(errorStatus).render(view, { role: role, error: err.message || 'Something went wrong', status: errorStatus });
});

export default router;