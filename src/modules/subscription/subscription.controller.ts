import { Request, Response, NextFunction } from 'express';
import { SubscriptionService } from './subscription.service';

const subscriptionService = new SubscriptionService();

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201).json({ success: true, message: 'Not implemented' });
    } catch (error) {
        next(error);
    }
};

export const cancel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ success: true, message: 'Not implemented' });
    } catch (error) {
        next(error);
    }
};
