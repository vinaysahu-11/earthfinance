import { Router } from 'express';
import { login, getMe, logout, changePassword } from '../controllers/authController';
import { requireAuth } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateRequest';
import { loginSchema, changePasswordSchema } from '../validators/authValidators';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), login);
router.get('/me', requireAuth, getMe);
router.post('/logout', requireAuth, logout);
router.post('/change-password', requireAuth, validate(changePasswordSchema), changePassword);

export default router;
