import { logger } from '../utils/logger';
import { SubscriptionModel } from '../modules/subscription/subscription.model';
import { UsageModel } from '../modules/usage/usage.model';
import { SubscriptionStatus } from '../modules/subscription/subscription.types';

export const aggregateUsage = async () => {
    logger.info('Starting usage aggregation job...');
    try {
        // Get all active subscriptions
        const subscriptions = await SubscriptionModel.find({
            status: SubscriptionStatus.ACTIVE,
        });

        logger.info(`Aggregating usage for ${subscriptions.length} active subscriptions`);

        for (const subscription of subscriptions) {
            try {
                // Aggregate usage for this subscription
                const aggregated = await UsageModel.aggregate([
                    {
                        $match: {
                            subscriptionId: subscription._id,
                        },
                    },
                    {
                        $group: {
                            _id: '$metric',
                            totalQuantity: { $sum: '$quantity' },
                        },
                    },
                ]);

                logger.info(`Usage aggregation for subscription ${subscription._id}: ${JSON.stringify(aggregated)}`);
            } catch (error) {
                logger.error(`Failed to aggregate usage for subscription ${subscription._id}: ${error}`);
            }
        }

        logger.info('Usage aggregation job completed');
    } catch (error) {
        logger.error(`Usage aggregation job failed: ${error}`);
    }
};
