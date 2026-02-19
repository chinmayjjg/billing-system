import { SubscriptionModel } from './subscription.model';
import { CreateSubscriptionDTO, SubscriptionStatus } from './subscription.types';
import { PlanModel } from '../plan/plan.model';
import { AppError } from '../../utils/AppError';

export class SubscriptionService {
    async create(data: CreateSubscriptionDTO) {
        // Look up the plan to ensure it exists
        const plan = await PlanModel.findById(data.planId);
        if (!plan) {
            throw new AppError('Plan not found', 404);
        }

        // Compute period dates based on plan interval
        const currentPeriodStart = new Date();
        const currentPeriodEnd = new Date();
        
        if (plan.interval === 'monthly') {
            currentPeriodEnd.setDate(currentPeriodEnd.getDate() + 30);
        } else if (plan.interval === 'yearly') {
            currentPeriodEnd.setDate(currentPeriodEnd.getDate() + 365);
        }

        const subscription = await SubscriptionModel.create({
            organizationId: data.organizationId,
            planId: data.planId,
            status: SubscriptionStatus.ACTIVE,
            currentPeriodStart,
            currentPeriodEnd,
            cancelAtPeriodEnd: false,
        });

        return subscription.toObject();
    }

    async cancel(id: string, cancelNow: boolean = false) {
        const subscription = await SubscriptionModel.findById(id);
        if (!subscription) {
            throw new AppError('Subscription not found', 404);
        }

        if (cancelNow) {
            subscription.status = SubscriptionStatus.CANCELED;
        } else {
            subscription.cancelAtPeriodEnd = true;
        }

        await subscription.save();
        return subscription.toObject();
    }
}
