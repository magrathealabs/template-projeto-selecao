const moment = require('moment');

const BirthdaysData= require('../../data/birthdaysData');

const addBirthday = (req, res) => {
  const { date, name } = req.body;

  if(!date || !name || name === '') {
    res.status(400).send({error: "Date and Name are required."});
    return;
  }
  const parsedDate = moment(date);

  if(moment().isBefore(parsedDate)) {
    res.status(400).send({error: "Date must be up to today."});
    return;
  }

  BirthdaysData.addBirthday({date, name});

  res.status(200).send({date, name});
}

module.exports = addBirthday;
