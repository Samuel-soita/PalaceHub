import { Router } from 'express';
import { getEvents, getEventsByDepartment, createEvent, updateEvent, deleteEvent } from './events.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getEvents);
router.get('/department/:departmentId', authenticate, getEventsByDepartment);
router.post('/', authenticate, createEvent);
router.put('/:id', authenticate, updateEvent);
router.delete('/:id', authenticate, deleteEvent);

export default router;
