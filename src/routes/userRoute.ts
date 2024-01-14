import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updateUserRole,
} from '../controllers/userController';
//import { UserRole } from '../types/User';

// MIDDLEWARES
import { authorizeByRole } from '../middlewares/authorizeByRole';
import { validateUserDatas } from '../middlewares/validateUserDatas';
import { UserRole } from '../types/User';
import { sendJsonResponse } from '../middlewares/sendJsonResponse';

const router = express.Router();

// CREATE /user
router.post(
  '/',
  validateUserDatas(true),
  authorizeByRole([UserRole.ADMIN]),
  createUser,
  sendJsonResponse('user'),
);

// READ ALL /user
router.get(
  '/',
  authorizeByRole([UserRole.ADMIN]),
  getAllUsers,
  sendJsonResponse('users'),
);

// READ BY ID /user/:id
router.get(
  '/:id',
  authorizeByRole([UserRole.ADMIN]),
  getUserById,
  sendJsonResponse('user'),
);

// UPDATE /user/:id
router.patch(
  '/:id',
  validateUserDatas(false),
  authorizeByRole([UserRole.ADMIN]),
  updateUserById,
  sendJsonResponse('user'),
);

// DELETE /user/:id
router.delete(
  '/:id',
  authorizeByRole([UserRole.ADMIN]),
  deleteUserById,
  sendJsonResponse('message'),
);

export default router;
