import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { ResponseError } from '../types/ResponseError';

const prisma = new PrismaClient();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, role, firstName, lastName } = req.body;

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        firstName,
        lastName,
      },
    });

    res.status(201);
    res.locals.user = user;
    next();
  } catch (error: any) {
    next(new ResponseError(500, 'Internal server error', error));
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      next(new ResponseError(404, 'No users found'));
    } else {
      res.status(200);
      res.locals.users = users;
      next();
    }
  } catch (error: any) {
    next(new ResponseError(500, 'Internal server error', error));
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      next(new ResponseError(404, 'User not found'));
    } else {
      res.status(200);
      res.locals.user = user;
      next();
    }
  } catch (error: any) {
    next(new ResponseError(500, 'Internal server error', error));
  }
};

export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;
  const { email, password, firstName, lastName, role } = req.body;

  try {
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        email,
        password: hashedPassword,
        firstName,
        role,
        lastName,
      },
    });

    res.status(200);
    res.locals.user = user;
    next();
  } catch (error: any) {
    next(new ResponseError(500, 'Internal server error', error));
  }
};

export const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;
  const { role } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        role,
      },
    });

    res.status(200);
    res.locals.user = user;
    next();
  } catch (error: any) {
    next(new ResponseError(500, 'Internal server error', error));
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;

  try {
    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    res.status(200);
    res.locals.message = 'User deleted successfully';
    next();
  } catch (error: any) {
    next(new ResponseError(500, 'Internal server error', error));
  }
};
