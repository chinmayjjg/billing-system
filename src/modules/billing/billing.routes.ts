import { Router } from 'express';
import * as billingController from './billing.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/calculate', billingController.calculate);

export default router;
