import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

// POST /user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password, role, firstName, lastName } = req.body;

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create the user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
                firstName,
                lastName
            }
        });

        // Return the created user
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET /user
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET /user/:id
export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// PATCH /user/:id
export const updateUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { email, password, firstName, lastName, role } = req.body;

    try {
        // Hash the new password
        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                email,
                password: hashedPassword,
                firstName,
                role,
                lastName
            }
        });

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// PATCH /user/:id/role
export const updateUserRole = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { role } = req.body;

    try {
        const user = await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                role
            }
        });

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE /user/:id
export const deleteUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        await prisma.user.delete({
            where: {
                id: Number(userId)
            }
        });

        return res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

