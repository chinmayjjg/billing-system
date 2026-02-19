import { Request, Response, NextFunction } from 'express';
import { UsageService } from './usage.service';
import { z } from 'zod';
import { AppError } from '../../utils/AppError';

const usageService = new UsageService();

const TrackUsageSchema = z.object({
    subscriptionId: z.string().min(1),
    metric: z.string().min(1),
    quantity: z.number().positive(),
    idempotencyKey: z.string().optional(),
});

export const track = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = TrackUsageSchema.safeParse(req.body);
        if (!parsed.success) {
            return next(new AppError(parsed.error.issues[0]?.message || 'Validation error', 400));
        }
        const usage = await usageService.track(parsed.data);
        res.status(201).json({ success: true, data: usage });
    } catch (error) {
        next(error);
    }
};

export const getAggregated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subscriptionId } = req.params;
        const { from, to } = req.query;

        if (!from || !to) {
            return next(new AppError('from and to query parameters are required', 400));
        }

        const fromDate = new Date(from as string);
        const toDate = new Date(to as string);

        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            return next(new AppError('Invalid date format', 400));
        }

        const aggregated = await usageService.getAggregatedUsage(subscriptionId as string, fromDate, toDate);
        res.status(200).json({ success: true, data: aggregated });
    } catch (error) {
        next(error);
    }
};
