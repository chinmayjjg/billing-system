import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new AppError('No token provided. Please log in.', 401));
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (error) {
        next(new AppError('Invalid or expired token. Please log in again.', 401));
    }
};
