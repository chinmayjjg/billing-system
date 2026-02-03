import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    logger.error(err);

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    });
};
