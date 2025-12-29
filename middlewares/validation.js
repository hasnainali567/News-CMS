import { body } from 'express-validator';

const loginValidation = [
    body('userName')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .matches(/^\S+$/)
        .withMessage('Username must not contain spaces')
        .isLength({ min: 4, max: 10 })
        .withMessage('Username must be between 4 and 10 characters'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5, max: 10 })
        .withMessage('Password must be between 5 and 10 characters')
];

const userValidation = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 5, max: 20 })
        .withMessage('Full name must be between 5 and 20 characters'),

    body('userName')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .matches(/^\S+$/)
        .withMessage('Username must not contain spaces')
        .isLength({ min: 4, max: 10 })
        .withMessage('Username must be between 4 and 10 characters'),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5, max: 10 })
        .withMessage('Password must be between 5 and 10 characters'),

    body('role')
        .notEmpty()
        .withMessage('Role is required').
        isIn(['admin', 'author'])
        .withMessage('Role must be either admin or author'),
];

const userUpdateValidation = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 5, max: 20 })
        .withMessage('Full name must be between 5 and 20 characters'),
    body('role')
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['admin', 'author'])
        .withMessage('Role must be either admin or author'),

    body('password')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 5, max: 10 })
        .withMessage('Password must be between 5 and 10 characters'),
];

const newsValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 20, max: 50 })
        .withMessage('Title must be between 20 and 50 characters'),

    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 100, max: 5000 })
        .withMessage('Content must be between 100 and 5000 characters'),
    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isLength({ min: 24, max: 24 })
        .withMessage('Invalid category ID'),
];

const updateNewsValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 20, max: 50 })
        .withMessage('Title must be between 20 and 50 characters'),

    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 100, max: 5000 })
        .withMessage('Content must be between 100 and 5000 characters'),

    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isLength({ min: 24, max: 24 })
        .withMessage('Invalid category ID'),
];


const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 20 })
        .withMessage('Category name must be between 3 and 20 characters'),
    body('description')
        .optional({ checkFalsy: true })
        .trim()
        .notEmpty()
        .withMessage('Description cannot be empty')
        .isLength({ max: 200 })
        .withMessage('Description cannot exceed 200 characters')
];

const updateCategoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 20 })
        .withMessage('Category name must be between 3 and 20 characters'),
    body('description')
        .optional({ checkFalsy: true })
        .trim()
        .notEmpty()
        .withMessage('Description cannot be empty')
        .isLength({ max: 200 })
        .withMessage('Description cannot exceed 200 characters')
];




export default { loginValidation, userValidation, userUpdateValidation, newsValidation, updateNewsValidation, categoryValidation, updateCategoryValidation };