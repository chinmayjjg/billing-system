import { logger } from '../utils/logger';

export const aggregateUsage = async () => {
    logger.info('Starting usage aggregation job...');
    try {
        // TODO: Aggregate usage for subscriptions
        logger.info('Usage aggregation job completed');
    } catch (error) {
        logger.error(`Usage aggregation job failed: ${error}`);
    }
};
