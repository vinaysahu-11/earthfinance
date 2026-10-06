import { Router } from 'express';
import {
  getPublicIndustries,
  getPublicIndustryBySlug,
  getAdminIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry
} from '../controllers/industryController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getPublicIndustries);
router.get('/:slug', getPublicIndustryBySlug);

router.get('/admin/all', requireAuth, getAdminIndustries);
router.post('/', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), createIndustry);
router.put('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), updateIndustry);
router.delete('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteIndustry);

export default router;
