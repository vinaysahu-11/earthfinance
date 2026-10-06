import { Router } from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  rescheduleAppointment,
  assignAppointment
} from '../controllers/appointmentController';
import { requireAuth } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateRequest';
import {
  createAppointmentSchema,
  updateAppointmentStatusSchema,
  rescheduleAppointmentSchema,
  assignAppointmentSchema
} from '../validators/appointmentValidators';
import { enquiryLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public appointment booking
router.post('/', enquiryLimiter, validate(createAppointmentSchema), createAppointment);

// Protected admin appointment management
router.get('/', requireAuth, getAppointments);
router.get('/:id', requireAuth, getAppointmentById);
router.patch('/:id/status', requireAuth, validate(updateAppointmentStatusSchema), updateAppointmentStatus);
router.patch('/:id/reschedule', requireAuth, validate(rescheduleAppointmentSchema), rescheduleAppointment);
router.patch('/:id/assign', requireAuth, validate(assignAppointmentSchema), assignAppointment);

export default router;
