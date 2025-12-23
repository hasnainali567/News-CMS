import ApiResponse from '../../utils/ApiResponse.js';
import asyncHandler from '../../utils/AsyncHandler.js';
import User from '../../models/user.model.js';


const LoginPage = asyncHandler(async (req, res) => {
    res.render('admin/login', { layout: false });
});

const LoginAdmin = asyncHandler(async (req, res) => {
    // Your logic to handle admin login
});

const LogoutAdmin = asyncHandler(async (req, res) => {
    // Your logic to handle admin logout
});

const allUsers = asyncHandler(async (req, res) => {
    res.render('admin/users/');
});

const addUserPage = asyncHandler(async (req, res) => {
    res.render('admin/users/create');
});

const addUser = asyncHandler(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) throw new ApiError(400, 'Please provide user details');
    const { fullName, userName, password, role } = req.body;

    await User.create({ fullName, userName, password, role });

    res.status(201).redirect('/admin/users');
});

const updateUserPage = asyncHandler(async (req, res) => {
    res.render('admin/users/update');
});

const updateUser = asyncHandler(async (req, res) => {
    // Your logic to update a user
});

const deleteUser = asyncHandler(async (req, res) => {
    // Your logic to delete a user
});

const dashBordPage = asyncHandler(async (req, res) => {
    res.render('admin/dashboard');
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

