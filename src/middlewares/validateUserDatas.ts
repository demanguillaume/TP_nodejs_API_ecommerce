import { check, validationResult } from 'express-validator';
import { UserRole } from '../types/User';
import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../types/ResponseError';
import { PrismaClient } from '@prisma/client';

export const validateUserDatas = (requireUserRole = false) => [
    check('email').isEmail().withMessage('Email is not valid'),
    check('password')
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
    check('firstName').isLength({ min: 2 }),
    check('lastName').isLength({ min: 2 }),
    ...(requireUserRole ? [check('userRole').isIn(Object.values(UserRole)).withMessage('Role is not valid')] : []),    
    
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            
            next(new ResponseError(400, errorMessages.toString().replace(",", " | "), 'Validation Error: ' + JSON.stringify(errorMessages)));            
        }
        
        const prisma = new PrismaClient();
        const { email } = req.body;

        prisma.user.findUnique({ where: { email } })
            .then((user) => {
                if (user) {
                    next(new ResponseError(400, 'Email already exists', 'Email already exists'));
                } else {
                    next();
                }
            })
            .catch((error) => {
                next(new ResponseError(500, 'Internal Server Error', error.message));
            });
    },
];
