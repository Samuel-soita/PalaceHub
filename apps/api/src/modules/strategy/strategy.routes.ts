import { Router } from 'express';
import { getStrategies, getStrategiesByDepartment, createStrategy, updateStrategy, deleteStrategy } from './strategy.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getStrategies);
router.get('/department/:departmentId', authenticate, getStrategiesByDepartment);
router.post('/', authenticate, createStrategy);
router.put('/:id', authenticate, updateStrategy);
router.delete('/:id', authenticate, deleteStrategy);

export default router;
