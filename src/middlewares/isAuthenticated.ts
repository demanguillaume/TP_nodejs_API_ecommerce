import passport from 'passport';
import { Request, Response, NextFunction } from "express";
import { User } from '../types/User';
import { ResponseError } from '../types/ResponseError';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
        if (err) {
            next(new ResponseError(401, 'Error during authication', err.message));
        }
        if (!user) {
            next(new ResponseError(401, 'Authentication failed', 'Invalid token'));
        }
        res.locals.user = user;
        next();
    })(req, res, next);
};

