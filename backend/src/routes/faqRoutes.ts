import { Router } from 'express';
import {
  getPublicFaqs,
  getAdminFaqs,
  createFaq,
  updateFaq,
  deleteFaq
} from '../controllers/faqController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getPublicFaqs);
router.get('/admin/all', requireAuth, getAdminFaqs);
router.post('/', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), createFaq);
router.put('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), updateFaq);
router.delete('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteFaq);

export default router;
