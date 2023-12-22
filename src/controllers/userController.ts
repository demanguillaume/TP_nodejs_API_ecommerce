import e, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateUser } from '../utils/validationUtils';


const prisma = new PrismaClient();

// Controller for creating a user
export const createUser = async (req: Request, res: Response) => {
    try {
        // Check if the request body contains the necessary data
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body is required' });
        }

        const { email, password, firstName, lastName } = req.body;

        // Validate user fields
        const validationError = validateUser({email, password, firstName, lastName});

        if (validationError) {
            return res.status(400).json({ errors: validationError });
        }

        // Create a new user with the data provided in the request body
        const user = await prisma.user.create({ data: req.body });

        // Return a 201 response with the created user
        return res.status(201).json({ user });

    } catch (error: any) {
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return res.status(400).json({ message: 'Duplicate key error: Email must be unique' });
        }

        // Handle other errors
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

// Controller for getting a user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);

        const user = await prisma.user.findUnique({ where: { id: userId } });

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
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        return res.status(200).json({ users });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

// Controller for getting a user by email
export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        // Check for validation errors
        const userEmail = req.params.email;

        const user = await prisma.user.findUnique({ where: { email: userEmail } });

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
// export const updateUserById = async (req: Request, res: Response) => {
//     try {
//         const userId = Number(req.params.id);

//         // Check if the request body is empty
//         if (!req.body || Object.keys(req.body).length === 0) {
//             return res.status(400).json({ message: 'Request body is required' });
//         }

//         // Validate user fields
//         const validationError = validateUser({email, password, firstName, lastName});

//         if (validationError) {
//             return res.status(400).json({ errors: validationError });
//         }

//         const updatedUser = await prisma.user.update({
//             where: { id: userId },
//             data: req.body,
//         });

//         // Check if no user is found
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         return res.status(200).json({ user: updatedUser });
//     } catch (err: any) {
//         return res.status(500).json({ error: err.message });
//     }
// };

// Controller for deleting a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);

        const deleteUser = await prisma.user.delete({ where: { id: userId } });

        // Check if no user is found
        if (!deleteUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

// Controller for deleting all users
export const deleteAllUsers = async (_req: Request, res: Response) => {
    try {
        const deleteAllUsers = await prisma.user.deleteMany();

        // Check if no user is found
        if (!deleteAllUsers) {
            return res.status(404).json({ message: 'No users found' });
        }

        return res.status(200).json({ message: 'All users deleted successfully' });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

