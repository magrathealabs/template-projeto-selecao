const Express = require('express');

const router = Express.Router();

const birthdaysRoutes = require('./birthdays');

router.use('/birthdays', birthdaysRoutes);


module.exports = router;
