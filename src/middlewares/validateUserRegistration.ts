import { check, validationResult } from 'express-validator';
import { UserRole } from '../types/User';
import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../types/ResponseError';

export const validateUserRegistration = (requireUserRole = false) => [
    check('email').isEmail(),
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
    ...(requireUserRole ? [check('UserRole').isIn(Object.values(UserRole))] : []),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new ResponseError(400, JSON.stringify(errors.array()), 'Validation Error : ' + JSON.stringify(errors.array())));
        }
        next();
    },
];
