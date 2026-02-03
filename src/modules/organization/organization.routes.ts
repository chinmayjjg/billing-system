import { Router } from 'express';
import * as organizationController from './organization.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', organizationController.create);
router.get('/:id', organizationController.getOne);

export default router;
