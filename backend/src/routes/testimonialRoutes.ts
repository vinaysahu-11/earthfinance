import { Router } from 'express';
import {
  getPublicTestimonials,
  getAdminTestimonials,
  createTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getPublicTestimonials);
router.get('/admin/all', requireAuth, getAdminTestimonials);
router.post('/', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), createTestimonial);
router.delete('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteTestimonial);

export default router;
