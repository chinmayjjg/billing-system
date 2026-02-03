export interface IUsage {
    subscriptionId: string;
    metric: string;
    quantity: number;
    timestamp: Date;
    idempotencyKey?: string;
}

export type TrackUsageDTO = Omit<IUsage, 'timestamp'>;
