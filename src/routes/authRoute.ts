import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';

const router = express.Router();

console.log('authRoute');
// signup
router.post('/signup', registerUser);

// signin
router.post('/signin', loginUser);

export default router;