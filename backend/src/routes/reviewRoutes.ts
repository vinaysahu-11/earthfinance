import { Router } from 'express';
import {
  submitReview,
  getPublicReviews,
  getAdminReviews,
  updateReviewStatus,
  deleteReview
} from '../controllers/reviewController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateRequest';
import { submitReviewSchema, updateReviewStatusSchema } from '../validators/reviewValidators';
import { enquiryLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public routes
router.post('/', enquiryLimiter, validate(submitReviewSchema), submitReview);
router.get('/', getPublicReviews);

// Protected admin routes
router.get('/admin/all', requireAuth, getAdminReviews);
router.patch('/:id/status', requireAuth, validate(updateReviewStatusSchema), updateReviewStatus);
router.delete('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteReview);

export default router;
