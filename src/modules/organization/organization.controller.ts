import { Request, Response, NextFunction } from 'express';
import { OrganizationService } from './organization.service';

const organizationService = new OrganizationService();

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: validate body
        res.status(201).json({ success: true, message: 'Not implemented' });
    } catch (error) {
        next(error);
    }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: get org
        res.status(200).json({ success: true, message: 'Not implemented' });
    } catch (error) {
        next(error);
    }
};
