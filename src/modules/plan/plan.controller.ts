import { Request, Response, NextFunction } from 'express';
import { PlanService } from './plan.service';
import { z } from 'zod';
import { AppError } from '../../utils/AppError';
import { PlanInterval } from './plan.types';

const planService = new PlanService();

const CreatePlanSchema = z.object({
    name: z.string().min(1),
    code: z.string().min(1),
    description: z.string().optional(),
    priceInCents: z.number().positive(),
    interval: z.enum([PlanInterval.MONTHLY, PlanInterval.YEARLY]),
    features: z.array(z.string()),
    isActive: z.boolean().default(true),
});

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = CreatePlanSchema.safeParse(req.body);
        if (!parsed.success) {
            return next(new AppError(parsed.error.issues[0]?.message || 'Validation error', 400));
        }
        const plan = await planService.create(parsed.data);
        res.status(201).json({ success: true, data: plan });
    } catch (error) {
        next(error);
    }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const plans = await planService.findAll();
        res.status(200).json({ success: true, data: plans });
    } catch (error) {
        next(error);
    }
};
