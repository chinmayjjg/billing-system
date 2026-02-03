export enum InvoiceStatus {
    DRAFT = 'draft',
    OPEN = 'open',
    PAID = 'paid',
    VOID = 'void',
    UNCOLLECTIBLE = 'uncollectible',
}

export interface IInvoice {
    subscriptionId: string;
    amountInCents: number;
    status: InvoiceStatus;
    dueDate: Date;
    paidAt?: Date;
    invoicePdfUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateInvoiceDTO = Omit<IInvoice, 'createdAt' | 'updatedAt' | 'status' | 'paidAt'>;
