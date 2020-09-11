const express = require('express');
const router = express.Router();


const user = require('@controllers/user.js');



router.get('/api/users/:id', user.getUserById);

router.get('/api/users', user.getUsers);

router.post('/api/users', user.newUser);

router.delete('/users/:id', user.deleteUser);

router.put('/api/users', user.updateUser);


module.exports = router;