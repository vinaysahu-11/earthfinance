import { Router } from 'express';
import authRoutes from './authRoutes';
import leadRoutes from './leadRoutes';
import appointmentRoutes from './appointmentRoutes';
import loanRoutes from './loanRoutes';
import industryRoutes from './industryRoutes';
import reviewRoutes from './reviewRoutes';
import testimonialRoutes from './testimonialRoutes';
import faqRoutes from './faqRoutes';
import bannerRoutes from './bannerRoutes';
import blogRoutes from './blogRoutes';
import galleryRoutes from './galleryRoutes';
import contactRoutes from './contactRoutes';
import settingsRoutes from './settingsRoutes';
import seoRoutes from './seoRoutes';
import adminRoutes from './adminRoutes';
import reportRoutes from './reportRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/leads', leadRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/loans', loanRoutes);
router.use('/industries', industryRoutes);
router.use('/reviews', reviewRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/faqs', faqRoutes);
router.use('/banners', bannerRoutes);
router.use('/blog', blogRoutes);
router.use('/gallery', galleryRoutes);
router.use('/contact', contactRoutes);
router.use('/settings', settingsRoutes);
router.use('/seo', seoRoutes);
router.use('/admin', adminRoutes);
router.use('/reports', reportRoutes);

export default router;
