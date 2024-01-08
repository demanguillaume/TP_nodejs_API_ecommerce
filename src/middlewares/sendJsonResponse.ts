import { Request, Response, NextFunction } from 'express';

export const sendJsonResponse = (key: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const responseStatus = res.statusCode || 200;
    let responseData = key ? res.locals[key] : res.locals;
    if (key === 'token') {
      responseData = { token: responseData };
    }
    return res.status(responseStatus).json(responseData); 
  };
};