import { Router } from 'express';
import {
  getPublicBlogPosts,
  getPublicBlogPostBySlug,
  getAdminBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/blogController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getPublicBlogPosts);
router.get('/:slug', getPublicBlogPostBySlug);

router.get('/admin/all', requireAuth, getAdminBlogPosts);
router.post('/', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), createBlogPost);
router.put('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), updateBlogPost);
router.delete('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteBlogPost);

export default router;
