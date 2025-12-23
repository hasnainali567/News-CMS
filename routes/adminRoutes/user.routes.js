import express from 'express';
import { LoginPage, LoginAdmin, LogoutAdmin } from '../../controllers/admin-controllers/auth.controller.js';
import { AdminAuth } from '../../middlewares/adminAuth.middleware.js';
import { allUsers, addUserPage, addUser, updateUserPage, updateUser, deleteUser } from '../../controllers/admin-controllers/user.controller.js';


const router = express.Router();

// Admin dashboard route
router.get('/', LoginPage);
router.post('/login', LoginAdmin);
router.get('logout', LogoutAdmin);

//user management routes
router.get('/users', AdminAuth, allUsers);
router.get('/add-user', AdminAuth, addUserPage);
router.post('/add-user', AdminAuth, addUser);
router.get('/update-user/:id', AdminAuth, updateUserPage);
router.post('/update-user/:id', AdminAuth, updateUser);
router.get('/delete-user/:id', AdminAuth, deleteUser);

export default router;