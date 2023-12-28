import passport from 'passport';
import { Request, Response, NextFunction } from "express";
import { User } from '../models/User';


export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user; 
        next();
    })(req, res, next);
};
