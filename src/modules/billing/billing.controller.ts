import { Request, Response, NextFunction } from 'express';
import { BillingService } from './billing.service';

const billingService = new BillingService();

export const calculate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ success: true, message: 'Not implemented' });
    } catch (error) {
        next(error);
    }
};
