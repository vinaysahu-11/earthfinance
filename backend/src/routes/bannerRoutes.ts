import { Router } from 'express';
import {
  getPublicBanners,
  getAdminBanners,
  createBanner,
  deleteBanner
} from '../controllers/bannerController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getPublicBanners);
router.get('/admin/all', requireAuth, getAdminBanners);
router.post('/', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), createBanner);
router.delete('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteBanner);

export default router;
