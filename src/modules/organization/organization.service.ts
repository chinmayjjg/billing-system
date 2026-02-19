import { OrganizationModel } from './organization.model';
import { CreateOrganizationDTO } from './organization.types';
import { AppError } from '../../utils/AppError';

export class OrganizationService {
    async create(data: CreateOrganizationDTO) {
        const organization = await OrganizationModel.create(data);
        return organization.toObject();
    }

    async findById(id: string) {
        const organization = await OrganizationModel.findById(id);
        if (!organization) {
            throw new AppError('Organization not found', 404);
        }
        return organization.toObject();
    }
}
