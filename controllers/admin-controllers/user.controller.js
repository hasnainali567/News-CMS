import asyncHandler from '../../utils/AsyncHandler.js';


const LoginPage = asyncHandler(async (req, res) => {
    // Your logic to render login page
});

const LoginAdmin = asyncHandler(async (req, res) => {
    // Your logic to handle admin login
});

const LogoutAdmin = asyncHandler(async (req, res) => {
    // Your logic to handle admin logout
});

const allUsers = asyncHandler(async (req, res) => {
    // Your logic to get all users
});

const addUserPage = asyncHandler(async (req, res) => {
    // Your logic to render add user page
});

const addUser = asyncHandler(async (req, res) => {
    // Your logic to add a new user
});

const updateUserPage = asyncHandler(async (req, res) => {
    // Your logic to render update user page
});

const updateUser = asyncHandler(async (req, res) => {
    // Your logic to update a user
});

const deleteUser = asyncHandler(async (req, res) => {
    // Your logic to delete a user
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
    LogoutAdmin
    
};

