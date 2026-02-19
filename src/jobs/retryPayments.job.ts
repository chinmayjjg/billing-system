import { logger } from '../utils/logger';
import { InvoiceModel } from '../modules/invoice/invoice.model';
import { InvoiceStatus } from '../modules/invoice/invoice.types';
import { PaymentService } from '../modules/payment/payment.service';

const paymentService = new PaymentService();

export const retryPayments = async () => {
    logger.info('Starting payment retry job...');
    try {
        // Find invoices that are OPEN and have passed their due date
        const now = new Date();
        const invoices = await InvoiceModel.find({
            status: InvoiceStatus.OPEN,
            dueDate: { $lt: now },
        });

        logger.info(`Found ${invoices.length} overdue invoices for payment retry`);

        for (const invoice of invoices) {
            try {
                // Retry payment for this invoice
                const payment = await paymentService.processPayment({
                    invoiceId: invoice._id.toString(),
                    amountInCents: invoice.amountInCents,
                    currency: 'USD',
                });

                logger.info(`Payment retried successfully for invoice ${invoice._id}. Payment ID: ${payment._id}`);
            } catch (error) {
                logger.error(`Failed to retry payment for invoice ${invoice._id}: ${error}`);
            }
        }

        logger.info('Payment retry job completed');
    } catch (error) {
        logger.error(`Payment retry job failed: ${error}`);
    }
};
