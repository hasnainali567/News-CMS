import express from 'express';
import { LoginPage, LoginAdmin, LogoutAdmin, dashBordPage } from '../../controllers/admin-controllers/user.controller.js';
import { allUsers, addUserPage, addUser, updateUserPage, updateUser, deleteUser } from '../../controllers/admin-controllers/user.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import adminMiddleware from '../../middlewares/admin.middleware.js';


const router = express.Router();

// Admin dashboard route
router.get('/', LoginPage);
router.post('/login', LoginAdmin);
router.get('/logout', LogoutAdmin);
router.get('/dashboard', authMiddleware, dashBordPage);

//user management routes
router.use(authMiddleware);
router.get('/users', adminMiddleware, allUsers);
router.get('/add-user', adminMiddleware, addUserPage);
router.post('/add-user', adminMiddleware, addUser);
router.get('/update-user/:id', adminMiddleware, updateUserPage);
router.post('/update-user/:id', adminMiddleware, updateUser);
router.get('/delete-user/:id', adminMiddleware, deleteUser);

export default router;