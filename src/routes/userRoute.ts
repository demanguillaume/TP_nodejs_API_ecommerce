import express from 'express';
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById, updateUserRole } from '../controllers/userController';

const router = express.Router();

// POST /user
router.post('/', createUser);

// GET /user
router.get('/', getAllUsers);

// GET /user/:id
router.get('/:id', getUserById);

// PATCH /user/:id
router.patch('/:id', updateUserById);

// PATCH /user/:id/role
router.patch('/:id/role', updateUserRole);

// DELETE /user/:id
router.delete('/:id', deleteUserById);


export default router;
