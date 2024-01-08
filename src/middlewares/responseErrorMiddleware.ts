import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../types/ResponseError';

export const responseErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ResponseError) {
    if (err.message && err.message.trim() !== '') {
      console.error(err.message);
    }
    return res.status(err.statusCode).json({ error: err.clientMessage });
  } else {
    next(err);
  }
};
