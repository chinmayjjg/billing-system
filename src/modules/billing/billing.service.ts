import { BillingModel } from './billing.model';
import { CalculateBillDTO } from './billing.types';

export class BillingService {
    async calculateForSubscription(subscriptionId: string) {
        // TODO: Fetch usage and plan
        // TODO: Calculate bill
        throw new Error('Not implemented');
    }

    async generateInvoice(billingId: string) {
        // TODO: Generate invoice
        throw new Error('Not implemented');
    }
}
