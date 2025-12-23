import { Router } from "express";
const router = Router();


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

//category management routes
router.get('/categories', AdminAuth, allCategories);
router.get('/add-category', AdminAuth, addCategoryPage);
router.post('/add-category', AdminAuth, addCategory);
router.get('/update-category/:id', AdminAuth, updateCategoryPage);
router.post('/update-category/:id', AdminAuth, updateCategory);
router.get('/delete-category/:id', AdminAuth, deleteCategory);

//news management routes
router.get('/news', AdminAuth, allNews);
router.get('/add-news', AdminAuth, addNewsPage);
router.post('/add-news', AdminAuth, addNews);
router.get('/update-news/:id', AdminAuth, updateNewsPage);
router.post('/update-news/:id', AdminAuth, updateNews);
router.get('/delete-news/:id', AdminAuth, deleteNews);

//comment routes
router.get('/comments', AdminAuth, allComments);


export default router;