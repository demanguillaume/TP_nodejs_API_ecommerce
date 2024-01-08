import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { hash } from 'bcrypt';
import { ResponseError } from '../types/ResponseError';

const prisma = new PrismaClient();

config(); // Load environment variables from .env file

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT secret key is missing');
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, firstName, lastName } = req.body;

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

    // Set the status and locals for the response
    res.statusCode = 201;
    res.locals.token = token;
    next();
  } catch (error: any) {
    next(new ResponseError(500, 'Internal Server Error', error));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const responseError = new ResponseError(401, 'User not found');
      return next(responseError);
    }

    // Verify that the password matches the one stored in the database
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      next(new ResponseError(401, 'Incorrect password'));
    }

    // Generate a JWT token
    const token = sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    // Set the status and locals for the response
    res.statusCode = 200;
    res.locals.token = token;
    next();
  } catch (error: any) {
    next(new ResponseError(500, 'Internal Server Error', error));
  }
};
