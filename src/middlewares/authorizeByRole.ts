import { Request, Response, NextFunction } from 'express';
import { User, UserRole } from '../types/User';
import { ResponseError } from '../types/ResponseError';

export const authorizeByRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (user && user.role && roles.includes(user.role)) {
      next();
    } else {
      next(new ResponseError(403, 'Unauthorized'));
    }
  };
};
