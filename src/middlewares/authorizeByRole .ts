import { Request, Response, NextFunction } from 'express';
import { User, UserRole } from '../models/User';

export const authorizeByRole  = (roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as User;

        if (user && user.role && (user.role === UserRole.ADMIN || roles.includes(user.role))) {
            next();
        } else {
            res.status(403).json({ message: 'Unauthorized' });
        }
    };
};
