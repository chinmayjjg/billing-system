import { BillingModel } from './billing.model';
import { CalculateBillDTO } from './billing.types';
import { SubscriptionModel } from '../subscription/subscription.model';
import { PlanModel } from '../plan/plan.model';
import { UsageModel } from '../usage/usage.model';
import { InvoiceService } from '../invoice/invoice.service';
import { InvoiceStatus } from '../invoice/invoice.types';
import { AppError } from '../../utils/AppError';
import { InvoiceModel } from '../invoice/invoice.model';
import mongoose from 'mongoose';

const invoiceService = new InvoiceService();

export class BillingService {
    async calculateForSubscription(subscriptionId: string) {
        const subscription = await SubscriptionModel.findById(subscriptionId);
        if (!subscription) {
            throw new AppError('Subscription not found', 404);
        }

        const plan = await PlanModel.findById(subscription.planId);
        if (!plan) {
            throw new AppError('Plan not found', 404);
        }

        // Get usage aggregation for the current period
        const usage = await UsageModel.aggregate([
            {
                $match: {
                    subscriptionId: new mongoose.Types.ObjectId(subscriptionId),
                    timestamp: {
                        $gte: subscription.currentPeriodStart,
                        $lte: subscription.currentPeriodEnd,
                    },
                },
            },
            {
                $group: {
                    _id: '$metric',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
        ]);

        // Calculate total amount: base plan price + usage charges
        let totalAmountInCents = plan.priceInCents;
        
        // For now, we assume no per-unit charges; adjust if needed
        for (const u of usage) {
            // Example: add 1 cent per unit of usage (customize as needed)
            totalAmountInCents += u.totalQuantity * 1;
        }

        // Create billing record
        const billing = await BillingModel.create({
            subscriptionId,
            totalAmountInCents,
            periodStart: subscription.currentPeriodStart,
            periodEnd: subscription.currentPeriodEnd,
        });

        return billing.toObject();
    }

    async generateInvoice(billingId: string) {
        const billing = await BillingModel.findById(billingId);
        if (!billing) {
            throw new AppError('Billing record not found', 404);
        }

        // Check if invoice already exists
        const existingInvoice = await InvoiceModel.findOne({
            subscriptionId: billing.subscriptionId.toString(),
        });
        
        if (existingInvoice) {
            return existingInvoice.toObject();
        }

        // Due date is 7 days after period end
        const dueDate = new Date(billing.periodEnd);
        dueDate.setDate(dueDate.getDate() + 7);

        const invoice = await invoiceService.create({
            subscriptionId: billing.subscriptionId.toString(),
            amountInCents: billing.totalAmountInCents,
            dueDate,
        });

        return invoice;
    }
}
