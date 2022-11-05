import { Router } from 'express';
import healthRoute from './v1/health.route';
import authRoutes from './v1/auth.route';
import postRoutes from './v1/post.route';
import userRoutes from './v1/user.route';

const router = Router();

router.use('/health', healthRoute);
router.use('/auth', authRoutes);
router.use('/post', postRoutes);
router.use('/user', userRoutes);

export { router };
