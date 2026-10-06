import { Router } from 'express';
import {
  submitContact,
  getContactMessages,
  updateContactStatus
} from '../controllers/contactController';
import { requireAuth } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateRequest';
import { submitContactSchema } from '../validators/contactValidators';
import { enquiryLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', enquiryLimiter, validate(submitContactSchema), submitContact);
router.get('/admin/all', requireAuth, getContactMessages);
router.patch('/admin/:id/status', requireAuth, updateContactStatus);

export default router;
