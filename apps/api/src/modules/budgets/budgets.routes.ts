import { Router } from 'express';
import * as budgetController from './budgets.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/', authenticate, budgetController.createBudget);
router.get('/', authenticate, budgetController.getBudgets);

export default router;
