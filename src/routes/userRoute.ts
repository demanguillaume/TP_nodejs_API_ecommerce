import express from 'express';
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById, updateUserRole } from '../controllers/userController';
//import { UserRole } from '../types/User';

// MIDDLEWARES
import { authorizeByRole } from '../middlewares/authorizeByRole';
import { validateUserRegistration } from '../middlewares/validateUserRegistration';
import { UserRole } from '../types/User';

const router = express.Router();

// POST /user
router.post('/', 
    validateUserRegistration(true),
    authorizeByRole([UserRole.ADMIN]), 
    createUser
);

// GET /user
router.get('/', 
    authorizeByRole([UserRole.ADMIN]), 
    getAllUsers
);

// GET /user/:id
router.get('/:id', 
    authorizeByRole([UserRole.ADMIN]), 
    getUserById
);

// PATCH /user/:id
router.patch('/:id', 
    authorizeByRole([UserRole.ADMIN]), 
    updateUserById
);

// PATCH /user/:id/role
router.patch('/:id/role', 
    authorizeByRole([UserRole.ADMIN]), 
    updateUserRole
);

// DELETE /user/:id
router.delete('/:id', 
    authorizeByRole([UserRole.ADMIN]), 
    deleteUserById
);

export default router;