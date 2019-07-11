const Express = require('express');

const getBirthdays = require('./getByWeek');
const addBirthday = require('./addBirthday');

const router = Express.Router();

router.route('/')
  .get(getBirthdays)
  .post(addBirthday);

module.exports = router;
