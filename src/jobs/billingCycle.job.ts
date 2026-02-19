import { logger } from '../utils/logger';
import { SubscriptionModel } from '../modules/subscription/subscription.model';
import { BillingService } from '../modules/billing/billing.service';
import { SubscriptionStatus } from '../modules/subscription/subscription.types';

const billingService = new BillingService();

export const runBillingCycle = async () => {
    logger.info('Starting billing cycle job...');
    try {
        // Find subscriptions where currentPeriodEnd <= now
        const subscriptions = await SubscriptionModel.find({
            status: SubscriptionStatus.ACTIVE,
            currentPeriodEnd: { $lte: new Date() },
        });

        logger.info(`Found ${subscriptions.length} subscriptions due for billing`);

        for (const subscription of subscriptions) {
            try {
                // Calculate bill for subscription
                const billing = await billingService.calculateForSubscription(subscription._id.toString());
                logger.info(`Billing calculated for subscription ${subscription._id}`);

                // Generate invoice
                await billingService.generateInvoice(billing._id.toString());
                logger.info(`Invoice generated for subscription ${subscription._id}`);
            } catch (error) {
                logger.error(`Failed to process billing for subscription ${subscription._id}: ${error}`);
            }
        }

        logger.info('Billing cycle job completed');
    } catch (error) {
        logger.error(`Billing cycle job failed: ${error}`);
    }
};
