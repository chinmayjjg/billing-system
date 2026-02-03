import { PaymentModel } from './payment.model';
import { CreatePaymentDTO } from './payment.types';

export class PaymentService {
    async processPayment(data: CreatePaymentDTO) {
        // TODO: Integrate with payment gateway (Stripe/Mock)
        throw new Error('Not implemented');
    }
}
