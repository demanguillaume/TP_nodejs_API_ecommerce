import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { hash } from 'bcrypt';
import { validateUser } from '../utils/validationUtils';

const prisma = new PrismaClient();

config(); // Load environment variables from .env file

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT secret key is missing');
}

export const registerUser = async (req: Request, res: Response) => {
    console.log('registerUser');
    try {
        // Check if the request body is empty
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is missing' });
        }

        const { email, password, firstName, lastName } = req.body;

        const validationError = validateUser({
            email,
            password,
            firstName,
            lastName,
        });

        if (validationError.isValid === false) {
            return res.status(400).json({ message: validationError });
        }

        // Check if the user already exists
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });

        // Generate a JWT token
        const token = sign({ userId: newUser.id }, jwtSecret, { expiresIn: '1h' });

        // Send the token in the response
        return res.status(201).json({ token });
    } catch (error: any) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Check if the request body is empty
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Verify that the password matches the one stored in the database
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate a JWT token
        const token = sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        // Send the token in the response
        return res.status(200).json({ token });
    } catch (error: any) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};
