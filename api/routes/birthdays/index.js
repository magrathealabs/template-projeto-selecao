const Express = require('express');

const getBirthdays = require('./get');

const router = Express.Router();

router.route('/')
  .get(getBirthdays);


module.exports = router;
