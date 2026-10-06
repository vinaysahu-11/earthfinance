import { Router } from 'express';
import { getReports } from '../controllers/reportController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), getReports);

export default router;
