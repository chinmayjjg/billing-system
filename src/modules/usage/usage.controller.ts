import { Request, Response, NextFunction } from 'express';
import { UsageService } from './usage.service';

const usageService = new UsageService();

export const track = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201).json({ success: true, message: 'Not implemented' });
    } catch (error) {
        next(error);
    }
};
