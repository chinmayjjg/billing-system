import mongoose from 'mongoose';
import { IPlan, PlanInterval } from './plan.types';

const planSchema = new mongoose.Schema<IPlan>(
    {
        name: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        description: { type: String },
        priceInCents: { type: Number, required: true },
        interval: { type: String, enum: Object.values(PlanInterval), required: true },
        features: [{ type: String }],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const PlanModel = mongoose.model<IPlan>('Plan', planSchema);
