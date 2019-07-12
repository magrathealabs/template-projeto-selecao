const Express = require('express');

const getBirthdays = require('./getByWeek');
const addBirthday = require('./addBirthday');
const getSharedBirthdays = require('./getSharedBirthdays');

const router = Express.Router();

router.route('/')
  .get(getBirthdays)
  .post(addBirthday);

router.route('/:date')
  .get(getSharedBirthdays);

module.exports = router;
