import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';

// MIDDLEWARES
import { validateUserDatas } from '../middlewares/validateUserDatas';
import { sendJsonResponse } from '../middlewares/sendJsonResponse';

const router = express.Router();

// signup
router.post('/signup', 
    validateUserDatas(),
    registerUser,
    sendJsonResponse('token')
);

// signin
router.post('/signin', 
    loginUser,
    sendJsonResponse('token')
);

export default router;