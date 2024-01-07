import { Request, Response, NextFunction } from 'express';
import { User } from '../types/User';
import { UserRole } from '../types/User';
import { Order } from '../types/Order';
import { ResponseError } from '../types/ResponseError';

export const verifyOrderOwnership = (req: Request, res: Response, next: NextFunction) => {
    // Assuming req.user and req.order are populated
    const user = res.locals.user;
    const order = res.locals.order;

    // If the user role is USER, check if the order belongs to the user
    if (user.role === UserRole.USER && order.userId !== user.id) {
        res.status(403).json({ message: 'You are not allowed to access this resource'  });
        //next(new ResponseError(403, 'You are not allowed to access this resource'));
    } else {
        next();
    }
};