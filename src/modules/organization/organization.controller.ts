import { Request, Response, NextFunction } from 'express';
import { OrganizationService } from './organization.service';
import { z } from 'zod';
import { AppError } from '../../utils/AppError';

const organizationService = new OrganizationService();

const CreateOrganizationSchema = z.object({
    name: z.string().min(1),
    billingEmail: z.string().email(),
});

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = CreateOrganizationSchema.safeParse(req.body);
        if (!parsed.success) {
            return next(new AppError(parsed.error.issues[0]?.message || 'Validation error', 400));
        }
        const organization = await organizationService.create(parsed.data);
        res.status(201).json({ success: true, data: organization });
    } catch (error) {
        next(error);
    }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const organization = await organizationService.findById(id as string);
        res.status(200).json({ success: true, data: organization });
    } catch (error) {
        next(error);
    }
};
