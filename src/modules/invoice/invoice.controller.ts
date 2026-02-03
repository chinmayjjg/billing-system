import { Request, Response, NextFunction } from 'express';
import { InvoiceService } from './invoice.service';

const invoiceService = new InvoiceService();

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ success: true, message: 'Not implemented' });
    } catch (error) {
        next(error);
    }
};
