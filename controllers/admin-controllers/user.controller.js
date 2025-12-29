import ApiError from '../../utils/ApiError.js';
import asyncHandler from '../../utils/AsyncHandler.js';
import User from '../../models/user.model.js';
import News from '../../models/news.model.js';
import Category from '../../models/category.model.js';
import { validationResult } from 'express-validator';


//hiring@runnn.online

const LoginPage = asyncHandler(async (req, res) => {
    if (req.cookies && req.cookies.adminId) {
        return res.redirect('/admin/dashboard');
    }
    res.render('admin/login', { layout: false, errors: null });
});

const LoginAdmin = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        return res.status(400).render('admin/login', { layout: false, errors: errorMessages });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, 'Please provide login data');
    }

    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    if (!user) return res.render('admin/login', { layout: false, errors: ['Invalid username'] });
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return res.render('admin/login', { layout: false, errors: ['Invalid password'] });

    const token = await user.generateAuthToken();

    const role = user.role;
    let articlesCount = 0;
    if (role === 'admin') {
        articlesCount = await News.countDocuments();
    } else {
        articlesCount = await News.countDocuments({ author: user._id });
    }

    res.cookie('adminId', token, { httpOnly: true });
    res.redirect('/admin/dashboard');

});

const LogoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie('adminId');
    res.redirect('/admin/');
});

const allUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.render('admin/users/', { users, role: req.role });
});

const addUserPage = asyncHandler(async (req, res) => {
    res.render('admin/users/create', { role: req.role, errors: null });
});


const addUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    let errorMessages = [];
    if (req.uploadError) {
        errorMessages.push(req.uploadError.message);
    }
    if (req.body.userName) {
        const users = await User.find({ userName: req.body.userName });
        if (users.length > 0) {
            errors.errors.push({ msg: 'User name already exists' });
        }
    }
    if (!errors.isEmpty() || errorMessages.length > 0) {
        errorMessages = [...errorMessages, ...errors.array().map(err => err.msg)];
        return res.status(400).render('admin/users/create', { role: req.role, errors: errorMessages });
    }
    const { fullName, userName, password } = req.body;
    const newUser = new User({
        fullName,
        userName,
        password,
    });
    await newUser.save();
    res.redirect('/admin/users');
});


const updateUserPage = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).select('-password');
    if (!user) throw new ApiError(404, 'User not found');

    res.render('admin/users/update', { user, role: req.role, errors: null });
});

const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    let errorMessages = [];
    const user = await User.findById(id);
    if (!user) errorMessages.push('User not found');

    if (!errors.isEmpty() || errorMessages.length > 0) {
        errorMessages = [...errorMessages, ...errors.array().map(err => err.msg)];
        return res.status(400).render('admin/users/update', { role: req.role, errors: errorMessages, user });
    }

    const { fullName, userName, password } = req.body;

    user.fullName = req.body.fullName || user.fullName;
    user.userName = req.body.userName || user.userName;
    user.role = req.body.role || user.role;
    if (password) user.password = req.body.password || user.password;
    await user.save();

    res.redirect('/admin/users');
});


const deleteUser = asyncHandler(async (req, res) => {
    // Your logic to delete a user
    const id = req.params.id;
    const articles = await News.find({ author: id })
    if(articles.length > 0) {
        return res.status(400).send('Cannot delete User with associated news article');
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new ApiError(404, 'User not found');

    res.status(200).send('User deleted successfully');
});

const dashBordPage = asyncHandler(async (req, res) => {
    const role = req.role;
    let articlesCount;
    let usersCount;
    let categoriesCount;
    if (role === 'admin') {
        articlesCount = await News.countDocuments();
        usersCount = await User.countDocuments();
        categoriesCount = await Category.countDocuments();
        return res.render('admin/dashboard', { fullName: req.admin.fullName, role: req.role, articlesCount, usersCount, categoriesCount });
    } else {
        articlesCount = await News.countDocuments({ author: req.admin.userId });
        res.render('admin/dashboard', { fullName: req.admin.fullName, role: req.role, articlesCount, usersCount, categoriesCount });
    }
});

export {
    allUsers,
    addUserPage,
    addUser,
    updateUserPage,
    updateUser,
    deleteUser,
    LoginPage,
    LoginAdmin,
    LogoutAdmin,
    dashBordPage
};

 