import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Validate request body
        // const user = await authService.register(req.body);
        res.status(201).json({ success: true, message: 'Not implemented' });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Validate request body
        // const { email, password } = req.body;
        // const result = await authService.login(email, password);
        res.status(200).json({ success: true, message: 'Not implemented' });
    } catch (error) {
        next(error);
    }
};
