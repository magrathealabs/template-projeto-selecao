const moment = require('moment');

const BirthdaysData= require('../../data/birthdaysData');

const getByWeekOfYear = (req, res) => {
  const { date } = req.params;

  const parsedDate = moment(date);

  if(!parsedDate.isValid()) {
    res.status(400).send({error: `${date} is not a valid date.`});
    return;
  }

  res.status(200).send({
    sameBirthday: BirthdaysData.getByDate(parsedDate),
    sameAge: BirthdaysData.getByYear(parsedDate),
  });
}

module.exports = getByWeekOfYear;
