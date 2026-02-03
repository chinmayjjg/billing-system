import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        // Stub implementation
        if (!authHeader) {
            // In a real app, this would throw an error if auth is required
            // return next(new AppError('No token provided', 401));
        }

        // Mock user
        req.user = {
            id: 'mock-user-id',
            email: 'admin@example.com',
            role: 'admin',
        };

        next();
    } catch (error) {
        next(new AppError('Authentication failed', 401));
    }
};
