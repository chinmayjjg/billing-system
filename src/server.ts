import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';
import { logger } from './utils/logger';

const start = async () => {
    try {
        await connectDB();

        const server = app.listen(env.PORT, () => {
            logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
        });

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
