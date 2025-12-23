import express from 'express';
import { LoginPage, LoginAdmin, LogoutAdmin, dashBordPage } from '../../controllers/admin-controllers/user.controller.js';
import { allUsers, addUserPage, addUser, updateUserPage, updateUser, deleteUser } from '../../controllers/admin-controllers/user.controller.js';


const router = express.Router();

// Admin dashboard route
router.get('/', LoginPage);
router.post('/login', LoginAdmin);
router.get('/logout', LogoutAdmin);
router.get('/dashboard', dashBordPage);

//user management routes
router.get('/users', allUsers);
router.get('/add-user', addUserPage);
router.post('/add-user', addUser);
router.get('/update-user/:id', updateUserPage);
router.post('/update-user/:id', updateUser);
router.get('/delete-user/:id', deleteUser);

export default router;