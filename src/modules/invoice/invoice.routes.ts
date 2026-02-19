import { Router } from 'express';
import * as invoiceController from './invoice.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/:id', invoiceController.get);
router.get('/', invoiceController.list);

export default router;
