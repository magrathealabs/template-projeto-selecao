import { Router } from 'express';
const router = Router();


import user from '../controllers/user';

router.get('/api/login', user.login);

router.get('/api/users/:id', user.getUserById);

router.get('/api/users', user.getAll);

// router.delete('/users/:id', user.deleteUser);

// router.put('/api/users', user.updateUser);


export default router;