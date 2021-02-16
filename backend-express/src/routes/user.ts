import { Router } from 'express';
import { hasQueryCode }  from '../middlewares/user';
const router = Router();

import user from '../controllers/user';

router.get('/api/login', hasQueryCode, user.login);

router.get('/api/users/:id', user.getUserById);

router.get('/api/users', user.getAll);

export default router;