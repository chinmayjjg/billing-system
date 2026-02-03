import mongoose from 'mongoose';
import { IOrganization } from './organization.types';

const organizationSchema = new mongoose.Schema<IOrganization>(
    {
        name: { type: String, required: true },
        billingEmail: { type: String, required: true },
        planId: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Plan' },
        stripeCustomerId: { type: String },
    },
    { timestamps: true }
);

export const OrganizationModel = mongoose.model<IOrganization>('Organization', organizationSchema);
