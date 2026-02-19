import { PaymentModel } from './payment.model';
import { CreatePaymentDTO, PaymentStatus } from './payment.types';
import { InvoiceService } from '../invoice/invoice.service';
import { AppError } from '../../utils/AppError';

const invoiceService = new InvoiceService();

export class PaymentService {
    async processPayment(data: CreatePaymentDTO) {
        // Simulate payment processing (always succeed)
        const payment = await PaymentModel.create({
            ...data,
            status: PaymentStatus.SUCCEEDED,
            transactionId: `txn_${Date.now()}`,
        });

        // Mark invoice as paid
        await invoiceService.markAsPaid(data.invoiceId);

        return payment.toObject();
    }
}
