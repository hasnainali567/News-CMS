import ApiError from '../../utils/ApiError.js';
import asyncHandler from '../../utils/AsyncHandler.js';
import User from '../../models/user.model.js';


//hiring@runnn.online

const LoginPage = asyncHandler(async (req, res) => {
    if (req.cookies && req.cookies.adminId) {
        return  res.redirect('/admin/dashboard');
    }
    res.render('admin/login', { layout: false, error: null });
});

const LoginAdmin = asyncHandler(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, 'Please provide login data');
    }
    
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    if (!user) res.render('admin/login', { layout: false, error: 'Invalid username' });

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) res.render('admin/login', { layout: false, error: 'Invalid password' });

    const token = await user.generateAuthToken();

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
    res.render('admin/users/create', { role: req.role });
});


const addUser = asyncHandler(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, 'Please provide user data');
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

    res.render('admin/users/update', { user, role : req.role });
});

const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, 'Please provide data to update');
    }

    const { fullName, userName, password } = req.body;

    const user = await User.findById(id);
    if (!user) throw new ApiError(404, 'User not found');

    user.fullName = req.body.fullName || user.fullName;
    user.userName = req.body.userName || user.userName;
    user.role = req.body.role || user.role;
    if(password) user.password = req.body.password || user.password;
    await user.save();


    res.redirect('/admin/users');
});


const deleteUser = asyncHandler(async (req, res) => {
    // Your logic to delete a user
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new ApiError(404, 'User not found');

    res.redirect('/admin/users');
});

const dashBordPage = asyncHandler(async (req, res) => {
    res.render('admin/dashboard', { fullName : req.admin.fullName, role: req.role});
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

