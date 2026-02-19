import { Request, Response, NextFunction } from 'express';
import { SubscriptionService } from './subscription.service';
import { z } from 'zod';
import { AppError } from '../../utils/AppError';

const subscriptionService = new SubscriptionService();

const CreateSubscriptionSchema = z.object({
    organizationId: z.string().min(1),
    planId: z.string().min(1),
});

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = CreateSubscriptionSchema.safeParse(req.body);
        if (!parsed.success) {
            return next(new AppError(parsed.error.issues[0]?.message || 'Validation error', 400));
        }
        const subscription = await subscriptionService.create(parsed.data);
        res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const cancel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { cancelNow } = req.body;
        const subscription = await subscriptionService.cancel(id as string, cancelNow);
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};
