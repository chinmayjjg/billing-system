import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { RegisterSchema, LoginSchema } from './auth.types';
import { AppError } from '../../utils/AppError';

const authService = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = RegisterSchema.safeParse(req.body);
        if (!parsed.success) {
            return next(new AppError(parsed.error.issues[0]?.message || 'Validation error', 400));
        }
        const user = await authService.register(parsed.data);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = LoginSchema.safeParse(req.body);
        if (!parsed.success) {
            return next(new AppError(parsed.error.issues[0]?.message || 'Validation error', 400));
        }
        const result = await authService.login(parsed.data.email, parsed.data.password);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};
