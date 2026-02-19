import { UsageModel } from './usage.model';
import { TrackUsageDTO } from './usage.types';
import mongoose from 'mongoose';

export class UsageService {
    async track(data: TrackUsageDTO) {
        // If idempotencyKey is provided, upsert based on it
        if (data.idempotencyKey) {
            const existing = await UsageModel.findOne({ idempotencyKey: data.idempotencyKey });
            if (existing) {
                return existing.toObject();
            }
        }
        
        const usage = await UsageModel.create({
            ...data,
            timestamp: new Date(),
        });
        return usage.toObject();
    }

    async getAggregatedUsage(subscriptionId: string, from: Date, to: Date) {
        const aggregated = await UsageModel.aggregate([
            {
                $match: {
                    subscriptionId: new mongoose.Types.ObjectId(subscriptionId),
                    timestamp: { 
                        $gte: from, 
                        $lte: to 
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

        return aggregated;
    }
}
