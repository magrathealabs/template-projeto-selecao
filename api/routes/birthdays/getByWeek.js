const moment = require('moment');

const BirthdaysData= require('../../data/birthdaysData');

const getByWeekOfYear = (req, res) => {
  const {
    week = moment().week(),
    year = moment().year(),
  } = req.query;

  const parsedWeek = parseInt(week);
  const parsedYear = parseInt(year);

  if(isNaN(parsedWeek) || isNaN(parsedYear) || parsedWeek <= 0) {
    res.status(400).send({error: "Week and Year must be valid Numbers"});
    return;
  }

  res.status(200).send(BirthdaysData.getWeek(week, year));
}

module.exports = getByWeekOfYear;
