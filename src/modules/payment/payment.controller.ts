import { Request, Response, NextFunction } from 'express';
import { PaymentService } from './payment.service';

const paymentService = new PaymentService();

export const processPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ success: true, message: 'Not implemented' });
    } catch (error) {
        next(error);
    }
};
