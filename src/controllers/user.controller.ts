import { Request, Response } from 'express';
import User from '../models/user.model';
import mongoose, { MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import { check, validationResult } from 'express-validator';

// Controller for creating a user
export const createUser = async (req: Request, res: Response) => {
    try {
        // Check if the request body contains the necessary data
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body is required' });
        }

        // Create a new user with the data provided in the request body
        const user = await User.create(req.body);

        // Return a 201 response with the created user
        return res.status(201).json({ user });
    } catch (error: any) {
        if (error instanceof MongoError && error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate key error: Email must be unique' });
        }

        // Handle other errors
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

// Controller for getting a user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findById(userId);

        // Check if no user is found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

// Controller for getting all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json({ users });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

// Controller for getting a user by email
export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Validate email format using express-validator
        check('email', 'Email is not valid').isEmail();

        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }

        const userEmail = req.params.email;

        const user = await User.findOne({ email: userEmail });

        // Check if no user is found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

// Controller for updating a user by ID
export const updateUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Check if the request body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body is required' });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        // Check if no user is found
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user: updatedUser });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

// Controller for deleting a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const deleteUser = await User.findByIdAndDelete(userId);

        // Check if no user is found
        if (!deleteUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};
