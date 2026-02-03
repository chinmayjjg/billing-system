import { Router } from 'express';
import * as usageController from './usage.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', usageController.track);

export default router;
