import mongoose from 'mongoose';
import { IPayment, PaymentStatus } from './payment.types';

const paymentSchema = new mongoose.Schema<IPayment>(
    {
        invoiceId: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Invoice', required: true },
        amountInCents: { type: Number, required: true },
        currency: { type: String, default: 'USD' },
        status: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.PENDING },
        transactionId: { type: String },
    },
    { timestamps: true }
);

export const PaymentModel = mongoose.model<IPayment>('Payment', paymentSchema);
