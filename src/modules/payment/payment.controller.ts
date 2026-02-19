import { Request, Response, NextFunction } from 'express';
import { PaymentService } from './payment.service';
import { z } from 'zod';
import { AppError } from '../../utils/AppError';

const paymentService = new PaymentService();

const ProcessPaymentSchema = z.object({
    invoiceId: z.string().min(1),
    amountInCents: z.number().positive(),
    currency: z.string().default('USD'),
});

export const processPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = ProcessPaymentSchema.safeParse(req.body);
        if (!parsed.success) {
            return next(new AppError(parsed.error.issues[0]?.message || 'Validation error', 400));
        }
        const payment = await paymentService.processPayment(parsed.data);
        res.status(200).json({ success: true, data: payment });
    } catch (error) {
        next(error);
    }
};
