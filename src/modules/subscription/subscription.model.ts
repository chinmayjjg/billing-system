import mongoose from 'mongoose';
import { ISubscription, SubscriptionStatus } from './subscription.types';

const subscriptionSchema = new mongoose.Schema<ISubscription>(
    {
        organizationId: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Organization', required: true },
        planId: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Plan', required: true },
        status: { type: String, enum: Object.values(SubscriptionStatus), default: SubscriptionStatus.ACTIVE },
        currentPeriodStart: { type: Date, required: true },
        currentPeriodEnd: { type: Date, required: true },
        cancelAtPeriodEnd: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const SubscriptionModel = mongoose.model<ISubscription>('Subscription', subscriptionSchema);
