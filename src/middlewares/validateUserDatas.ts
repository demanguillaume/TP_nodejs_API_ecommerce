import { check, validationResult } from 'express-validator';
import { UserRole } from '../types/User';
import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../types/ResponseError';
import { PrismaClient } from '@prisma/client';

export const validateUserDatas = (allFieldsRequired = false) => [
  check('email')
    .optional(!allFieldsRequired)
    .isEmail()
    .withMessage('Email is not valid'),
  check('password')
    .optional(!allFieldsRequired)
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .matches(/[a-z]/)
    .withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain an uppercase letter')
    .matches(/[^a-zA-Z0-9]/)
    .withMessage('Password must contain a special character'),
  check('firstName')
    .optional(!allFieldsRequired)
    .isLength({ min: 2 })
    .withMessage('First name is not valid'),
  check('lastName')
    .optional(!allFieldsRequired)
    .isLength({ min: 2 })
    .withMessage('Last name is not valid'),
  check('role')
    .optional(!allFieldsRequired)
    .isIn(Object.values(UserRole))
    .withMessage('Role is not valid'),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return next(
        new ResponseError(
          400,
          errorMessages.join(' | '),
          'Validation Error: ' + JSON.stringify(errorMessages),
        ),
      );
    }

    const { email } = req.body;

    if (email) {
      const prisma = new PrismaClient();

      try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
          next(
            new ResponseError(
              400,
              'Email already exists',
              'Email already exists',
            ),
          );
        }

        next();
      } catch (error: any) {
        next(new ResponseError(500, 'Internal Server Error', error));
      } finally {
        await prisma.$disconnect();
      }
    } else {
      next();
    }
  },
];
