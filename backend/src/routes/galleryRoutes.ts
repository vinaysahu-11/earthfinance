import { Router } from 'express';
import {
  getPublicGallery,
  getAdminGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getPublicGallery);
router.get('/admin/all', requireAuth, getAdminGallery);
router.post('/', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), createGalleryItem);
router.put('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), updateGalleryItem);
router.patch('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), updateGalleryItem);
router.delete('/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteGalleryItem);

export default router;
