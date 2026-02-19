import { Request, Response, NextFunction } from 'express';
import { BillingService } from './billing.service';

const billingService = new BillingService();

export const calculate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subscriptionId } = req.params;
        const billing = await billingService.calculateForSubscription(subscriptionId as string);
        res.status(200).json({ success: true, data: billing });
    } catch (error) {
        next(error);
    }
};
