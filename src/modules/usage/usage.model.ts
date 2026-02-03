import mongoose from 'mongoose';
import { IUsage } from './usage.types';

const usageSchema = new mongoose.Schema<IUsage>(
    {
        subscriptionId: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Subscription', required: true },
        metric: { type: String, required: true },
        quantity: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now },
        idempotencyKey: { type: String, unique: true, sparse: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } } // Usage records are immutable usually
);

export const UsageModel = mongoose.model<IUsage>('Usage', usageSchema);
