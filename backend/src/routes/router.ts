import { Router } from 'express';
import userRoutes from '../routes/user';

// Users routes
const router = Router();

router.use(userRoutes);

export default router;