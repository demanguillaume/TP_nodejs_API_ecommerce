import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../types/ResponseError';

export const checkDuplicateProductIds = (req: Request, res: Response, next: NextFunction) => {
    const { orderProducts } = req.body;

    const productIds = orderProducts.map((product: any) => product.productId);
    const uniqueProductIds = new Set(productIds);

    if (productIds.length !== uniqueProductIds.size) {
        next(new ResponseError(400, 'Duplicate productIds found'));
    }

    next();
};
