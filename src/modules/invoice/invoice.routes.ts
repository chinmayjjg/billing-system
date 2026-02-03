import { Router } from 'express';
import * as invoiceController from './invoice.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/:id', invoiceController.get);

export default router;
