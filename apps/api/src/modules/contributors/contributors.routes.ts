import { Router } from 'express';
import * as contributorController from './contributors.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/', authenticate, contributorController.createContributor);
router.get('/', authenticate, contributorController.getContributors);

export default router;
