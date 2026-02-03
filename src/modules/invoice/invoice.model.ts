import mongoose from 'mongoose';
import { IInvoice, InvoiceStatus } from './invoice.types';

const invoiceSchema = new mongoose.Schema<IInvoice>(
    {
        subscriptionId: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Subscription', required: true },
        amountInCents: { type: Number, required: true },
        status: { type: String, enum: Object.values(InvoiceStatus), default: InvoiceStatus.DRAFT },
        dueDate: { type: Date, required: true },
        paidAt: { type: Date },
        invoicePdfUrl: { type: String },
    },
    { timestamps: true }
);

export const InvoiceModel = mongoose.model<IInvoice>('Invoice', invoiceSchema);
