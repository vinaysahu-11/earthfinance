import { Router } from 'express';
import {
  getDashboardStats,
  getStaffList,
  createStaffUser,
  updateStaffStatus
} from '../controllers/adminController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateRequest';
import { createStaffSchema } from '../validators/authValidators';

const router = Router();

router.get('/dashboard-stats', requireAuth, getDashboardStats);

// Staff management
router.get('/staff', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), getStaffList);
router.post('/staff', requireAuth, requireRole(['SUPER_ADMIN']), validate(createStaffSchema), createStaffUser);
router.patch('/staff/:id', requireAuth, requireRole(['SUPER_ADMIN']), updateStaffStatus);

export default router;
