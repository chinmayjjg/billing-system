import { PlanModel } from './plan.model';
import { CreatePlanDTO } from './plan.types';

export class PlanService {
    async create(data: CreatePlanDTO) {
        const plan = await PlanModel.create(data);
        return plan.toObject();
    }

    async findAll() {
        const plans = await PlanModel.find({ isActive: true });
        return plans.map(p => p.toObject());
    }
}
