import { Router } from 'express';
import * as meetingController from './meetings.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
const router = Router();
router.post('/', authenticate, meetingController.createMeeting);
router.get('/', authenticate, meetingController.getMeetings);
router.patch('/:id', authenticate, meetingController.updateMeeting);
export default router;
