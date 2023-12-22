import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Handle the error here
    console.error(err);

    // Send an appropriate response to the client
    res.status(500).json({
        message: 'Internal Server Error',
    });
};
