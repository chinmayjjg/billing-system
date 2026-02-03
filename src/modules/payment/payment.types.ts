export enum PaymentStatus {
    PENDING = 'pending',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
}

export interface IPayment {
    invoiceId: string;
    amountInCents: number;
    currency: string;
    status: PaymentStatus;
    transactionId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreatePaymentDTO = Omit<IPayment, 'createdAt' | 'updatedAt' | 'status'>;
