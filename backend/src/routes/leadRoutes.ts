import { Router } from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  assignLead,
  addLeadNote
} from '../controllers/leadController';
import { requireAuth } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateRequest';
import {
  createLeadSchema,
  updateLeadStatusSchema,
  assignLeadSchema,
  addLeadNoteSchema
} from '../validators/leadValidators';
import { enquiryLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public lead submission
router.post('/', enquiryLimiter, validate(createLeadSchema), createLead);

// Protected admin lead management
router.get('/', requireAuth, getLeads);
router.get('/:id', requireAuth, getLeadById);
router.patch('/:id/status', requireAuth, validate(updateLeadStatusSchema), updateLeadStatus);
router.patch('/:id/assign', requireAuth, validate(assignLeadSchema), assignLead);
router.post('/:id/notes', requireAuth, validate(addLeadNoteSchema), addLeadNote);

export default router;
