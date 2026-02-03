export enum PlanInterval {
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
}

export interface IPlan {
    name: string;
    code: string; // unique slug
    description?: string;
    priceInCents: number;
    interval: PlanInterval;
    features: string[]; // List of features enabled
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type CreatePlanDTO = Omit<IPlan, 'createdAt' | 'updatedAt'>;
