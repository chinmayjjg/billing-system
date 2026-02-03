import { UsageModel } from './usage.model';
import { TrackUsageDTO } from './usage.types';

export class UsageService {
    async track(data: TrackUsageDTO) {
        // TODO: Track usage
        throw new Error('Not implemented');
    }

    async getAggregatedUsage(subscriptionId: string, from: Date, to: Date) {
        // TODO: Aggregation logic
        throw new Error('Not implemented');
    }
}
