export enum SubscriptionStatus {
    ACTIVE = 'active',
    CANCELED = 'canceled',
    PAST_DUE = 'past_due',
    TRIALING = 'trialing',
}

export interface ISubscription {
    organizationId: string;
    planId: string;
    status: SubscriptionStatus;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateSubscriptionDTO = Omit<ISubscription, 'createdAt' | 'updatedAt' | 'status' | 'currentPeriodStart' | 'currentPeriodEnd' | 'cancelAtPeriodEnd'>;
