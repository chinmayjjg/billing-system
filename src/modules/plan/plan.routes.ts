import { Router } from 'express';
import * as planController from './plan.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/role.middleware';

const router = Router();

router.get('/', planController.list);
router.post('/', authenticate, authorize(['admin']), planController.create);

export default router;
