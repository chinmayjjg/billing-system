import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { env } from './config/env';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

// Security and Performance Middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            status: 'ok',
            env: env.NODE_ENV,
            uptime: process.uptime(),
        },
    });
});

// API Routes (will be mounted here)
// API Routes
import authRoutes from './modules/auth/auth.routes';
import organizationRoutes from './modules/organization/organization.routes';
import planRoutes from './modules/plan/plan.routes';
import subscriptionRoutes from './modules/subscription/subscription.routes';
import usageRoutes from './modules/usage/usage.routes';
import billingRoutes from './modules/billing/billing.routes';
import invoiceRoutes from './modules/invoice/invoice.routes';
import paymentRoutes from './modules/payment/payment.routes';

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/organizations', organizationRoutes);
apiRouter.use('/plans', planRoutes);
apiRouter.use('/subscriptions', subscriptionRoutes);
apiRouter.use('/usage', usageRoutes);
apiRouter.use('/billing', billingRoutes);
apiRouter.use('/invoices', invoiceRoutes);
apiRouter.use('/payments', paymentRoutes);

app.use('/api/v1', apiRouter);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: {
            message: `Can't find ${req.originalUrl} on this server!`,
        },
    });
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
