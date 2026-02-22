import { Router } from 'express';
import { getVolunteers, getVolunteersByDepartment, createVolunteer, updateVolunteer, deleteVolunteer } from './volunteers.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getVolunteers);
router.get('/department/:departmentId', authenticate, getVolunteersByDepartment);
router.post('/', authenticate, createVolunteer);
router.put('/:id', authenticate, updateVolunteer);
router.delete('/:id', authenticate, deleteVolunteer);

export default router;
