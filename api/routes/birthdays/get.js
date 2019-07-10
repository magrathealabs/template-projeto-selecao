const moment = require('moment');

const BirthdaysData= require('../../data/birthdaysData');

const getByWeekOfYear = (req, res) => {
  const { week, year } = req.query;

  const parsedWeek = parseInt(week);
  const parsedYear = parseInt(year);

  if(isNaN(parsedWeek) || isNaN(parsedYear) || parsedWeek <= 0) {
    res.status(400).send({error: "Week and Year must be valid Numbers"});
    return;
  }

  const date = moment().weekYear(year);

  if(parsedWeek > date.weeksInYear()) {
    res.status(400).send({error: `The week #${week} is not present on the year ${year}.`});
    return;
  }



  res.status(200).send(BirthdaysData.getWeek(week, year));
}

module.exports = getByWeekOfYear;
