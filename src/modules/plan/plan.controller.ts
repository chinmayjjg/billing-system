import { Request, Response, NextFunction } from 'express';
import { PlanService } from './plan.service';

const planService = new PlanService();

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201).json({ success: true, message: 'Not implemented' });
    } catch (error) {
        next(error);
    }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ success: true, message: 'Not implemented' });
    } catch (error) {
        next(error);
    }
};
