import { Router } from 'express';
import * as paymentController from './payment.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', paymentController.processPayment);

export default router;
