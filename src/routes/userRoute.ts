import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

// Create a new user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getAllUsers);

// Get user by ID
router.get('/users/:id', userController.getUserById);

// Get user by email
router.get('/users/email/:email', userController.getUserByEmail);

// Update user by ID
// router.put('/users/:id', userController.updateUserById);

// Delete user by ID
router.delete('/users/:id', userController.deleteUserById);

export default router;
