import express from 'express';

const router = express.Router();

router.get('/register', showRegistrationForm);
router.post('/register', handleUserRegistration);
router.get('/login', showLoginForm);
router.post('/login', handleUserLogin);
router.get('/profile/:userId', getUserProfile);
router.put('/profile/:userId', updateUserProfile);
router.delete('/profile/:userId', deleteUserProfile);

export default router;