import { check, validationResult } from 'express-validator';
import { UserRole } from '../types/User';
import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../types/ResponseError';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const validateOrderDatas = [
  check('userId')
    .optional()
    .isInt().withMessage('userId must be an integer'),

  check('orderProducts')
    .isArray().withMessage('orderProducts must be an array')
    .notEmpty().withMessage('orderProducts is required'),

  check('orderProducts.*.productId')
    .isInt().withMessage('productId must be an integer')
    .notEmpty().withMessage('productId is required'),

  check('orderProducts.*.quantity')
    .isInt().withMessage('quantity must be an integer')
    .notEmpty().withMessage('quantity is required'),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);

      next(new ResponseError(400, errorMessages.toString().replace(",", " | "), 'Validation Error: ' + JSON.stringify(errorMessages)));
    } else {
      if (req.body.userId === undefined) {
        req.body.userId = res.locals.user.id;
      } else if (req.body.userId !== res.locals.user.id) {
        if (![UserRole.MANAGER, UserRole.ADMIN].includes(res.locals.user.role)) {
            next(new ResponseError(403, 'Forbidden order', 'Only managers and admins can create an order for another user'));
        }
      }

      // Check if the user exists
      const user = await prisma.user.findUnique({ where: { id: req.body.userId } });

      if (!user) {
        next(new ResponseError(404, 'User not found', 'The provided userId does not exist in the database'));        
      }

      next();
    }
  },
];