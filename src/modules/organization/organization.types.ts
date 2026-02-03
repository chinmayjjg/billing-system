export interface IOrganization {
    name: string;
    billingEmail: string;
    planId?: string;
    stripeCustomerId?: string; // Future proofing
    createdAt: Date;
    updatedAt: Date;
}

export type CreateOrganizationDTO = Omit<IOrganization, 'createdAt' | 'updatedAt' | 'stripeCustomerId'>;
