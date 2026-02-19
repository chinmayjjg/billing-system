import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';
import { logger } from './utils/logger';
import cron from 'node-cron';
import { runBillingCycle } from './jobs/billingCycle.job';
import { aggregateUsage } from './jobs/usageAggregation.job';
import { retryPayments } from './jobs/retryPayments.job';

const start = async () => {
    try {
        await connectDB();

        const server = app.listen(env.PORT, () => {
            logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
        });

        // Schedule background jobs
        // Billing cycle: daily at midnight (0 0 * * *)
        cron.schedule('0 0 * * *', () => {
            logger.info('Triggering billing cycle job');
            runBillingCycle().catch(error => logger.error(`Billing cycle job error: ${error}`));
        });

        // Payment retry: every hour (0 * * * *)
        cron.schedule('0 * * * *', () => {
            logger.info('Triggering payment retry job');
            retryPayments().catch(error => logger.error(`Payment retry job error: ${error}`));
        });

        // Usage aggregation: every 6 hours (0 */6 * * *)
        cron.schedule('0 */6 * * *', () => {
            logger.info('Triggering usage aggregation job');
            aggregateUsage().catch(error => logger.error(`Usage aggregation job error: ${error}`));
        });

        logger.info('Background jobs scheduled');

        // Graceful Shutdown
        const shutdown = () => {
            logger.info('SIGTERM/SIGINT signal received: closing HTTP server');
            server.close(() => {
                logger.info('HTTP server closed');
                process.exit(0);
            });
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);

    } catch (error) {
        logger.error(`Failed to start server: ${error}`);
        process.exit(1);
    }
};

start();
