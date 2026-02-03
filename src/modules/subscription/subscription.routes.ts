import { Router } from 'express';
import * as subscriptionController from './subscription.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', subscriptionController.create);
router.post('/:id/cancel', subscriptionController.cancel);

export default router;
