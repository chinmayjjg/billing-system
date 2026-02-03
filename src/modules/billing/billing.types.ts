export interface IBilling {
    subscriptionId: string;
    totalAmountInCents: number;
    periodStart: Date;
    periodEnd: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type CalculateBillDTO = Omit<IBilling, 'createdAt' | 'updatedAt'>;
