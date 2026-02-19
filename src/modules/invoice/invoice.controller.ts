import { Request, Response, NextFunction } from 'express';
import { InvoiceService } from './invoice.service';

const invoiceService = new InvoiceService();

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const invoice = await invoiceService.findById(id as string);
        res.status(200).json({ success: true, data: invoice });
    } catch (error) {
        next(error);
    }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subscriptionId, organizationId } = req.query;
        const invoices = await invoiceService.list({
            subscriptionId: subscriptionId as string,
            organizationId: organizationId as string,
        });
        res.status(200).json({ success: true, data: invoices });
    } catch (error) {
        next(error);
    }
};
