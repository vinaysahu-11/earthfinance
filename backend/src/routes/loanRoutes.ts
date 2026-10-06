import { Router } from 'express';
import {
  getPublicLoans,
  getPublicLoanBySlug,
  getCategories,
  getAdminLoans,
  createLoan,
  updateLoan,
  deleteLoan,
  createCategory,
  deleteCategory
} from '../controllers/loanController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getPublicLoans);
router.get('/categories', getCategories);
router.get('/:slug', getPublicLoanBySlug);

// Protected Admin routes
router.get('/admin/all', requireAuth, getAdminLoans);
router.post('/', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), createLoan);
router.put('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), updateLoan);
router.delete('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteLoan);

router.post('/categories', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), createCategory);
router.delete('/categories/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteCategory);

export default router;
