import { Router } from 'express';
import {
  getSeoByPath,
  getAdminSeoList,
  upsertSeoSetting
} from '../controllers/seoController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/page', getSeoByPath);
router.get('/admin/all', requireAuth, getAdminSeoList);
router.post('/admin', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), upsertSeoSetting);

export default router;
