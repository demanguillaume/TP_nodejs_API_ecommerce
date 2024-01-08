import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { ResponseError } from '../types/ResponseError';

const prisma = new PrismaClient();

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      },
    });

    res.status(201);
    res.locals.product = product;
    next();
  } catch (error: any) {
    next(new ResponseError(500, 'Internal server error', error));
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await prisma.product.findMany();

    if (products.length === 0) {
      next(new ResponseError(404, 'No products found'));
    } else {
      res.status(200);
      res.locals.products = products;
      next();
    }
  } catch (error: any) {
    next(new ResponseError(500, 'Internal server error', error));
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productId = req.params.id;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!product) {
      next(new ResponseError(404, 'Product not found'));
    } else {
      res.status(200);
      res.locals.product = product;
      next();
    }
  } catch (error: any) {
    next(new ResponseError(500, 'Internal server error', error));
  }
};

export const updateProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productId = req.params.id;

  try {
    const product = await prisma.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      },
    });

    res.status(200);
    res.locals.product = product;
    next();
  } catch (error: any) {
    next(new ResponseError(500, 'Internal server error', error));
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productId = req.params.id;

  try {
    await prisma.product.delete({
      where: {
        id: Number(productId),
      },
    });

    res.status(204);
    res.locals.message = 'Product deleted successfully';
    next();
  } catch (error: any) {
    next(new ResponseError(500, 'Internal server error', error));
  }
};
