import { InvoiceModel } from './invoice.model';
import { CreateInvoiceDTO, InvoiceStatus } from './invoice.types';
import { AppError } from '../../utils/AppError';

export class InvoiceService {
    async create(data: CreateInvoiceDTO) {
        const invoice = await InvoiceModel.create({
            ...data,
            status: InvoiceStatus.OPEN,
        });
        return invoice.toObject();
    }

    async findById(id: string) {
        const invoice = await InvoiceModel.findById(id);
        if (!invoice) {
            throw new AppError('Invoice not found', 404);
        }
        return invoice.toObject();
    }

    async list(filters: { subscriptionId?: string; organizationId?: string }) {
        const query: any = {};
        if (filters.subscriptionId) {
            query.subscriptionId = filters.subscriptionId;
        }
        // Note: organizationId would require a join or denormalization
        const invoices = await InvoiceModel.find(query);
        return invoices.map(i => i.toObject());
    }

    async markAsPaid(id: string) {
        const invoice = await InvoiceModel.findById(id);
        if (!invoice) {
            throw new AppError('Invoice not found', 404);
        }
        invoice.status = InvoiceStatus.PAID;
        invoice.paidAt = new Date();
        await invoice.save();
        return invoice.toObject();
    }
}
