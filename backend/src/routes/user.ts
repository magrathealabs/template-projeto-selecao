import { Router } from 'express';
const router = Router();


import user from '../controllers/user';


router.get('/api/users/:id', user.getUserById);

router.get('/api/users', user.getAll);

router.post('/api/users', user.createUser);

// router.delete('/users/:id', user.deleteUser);

// router.put('/api/users', user.updateUser);


export default router;