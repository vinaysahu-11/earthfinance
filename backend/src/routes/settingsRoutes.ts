import { Router } from 'express';
import {
  getPublicSettings,
  getAdminSettings,
  updateSetting
} from '../controllers/settingsController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/public', getPublicSettings);
router.get('/admin', requireAuth, getAdminSettings);
router.put('/admin/:key', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), updateSetting);

export default router;
