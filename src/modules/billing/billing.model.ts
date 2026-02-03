import mongoose from 'mongoose';
import { IBilling } from './billing.types';

const billingSchema = new mongoose.Schema<IBilling>(
    {
        subscriptionId: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Subscription', required: true },
        totalAmountInCents: { type: Number, required: true },
        periodStart: { type: Date, required: true },
        periodEnd: { type: Date, required: true },
    },
    { timestamps: true }
);

export const BillingModel = mongoose.model<IBilling>('Billing', billingSchema);
