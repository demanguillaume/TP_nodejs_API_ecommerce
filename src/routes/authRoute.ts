import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';

// MIDDLEWARES
import { validateUserRegistration } from '../middlewares/validateUserRegistration';
import { sendJsonResponse } from '../middlewares/sendJsonResponse';

const router = express.Router();

// signup
router.post('/signup', 
    validateUserRegistration(),
    registerUser,
    sendJsonResponse('token')
);

// signin
router.post('/signin', 
    loginUser,
    sendJsonResponse('token')
);

export default router;