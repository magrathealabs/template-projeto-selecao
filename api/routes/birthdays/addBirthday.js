const moment = require('moment');

const BirthdaysData= require('../../data/birthdaysData');

const addBirthday = (req, res) => {
  const { date, name } = req.body;

  if(!date || !name || name === '') {
    res.status(400).send({error: "Date and Name are required."});
    return;
  }

  if(typeof(name) !== 'string' || name === ''){
    res.status(400).send({error: "Name must be a valid string."});
    return;
  }

  const parsedDate = moment(date, "MM-DD-YYYT");

  if(!parsedDate.isValid()) {
    res.status(400).send({error: "Date must be a valid moment string."});
    return;
  }

  if(moment().isBefore(parsedDate)) {
    res.status(400).send({error: "Date must be up to today."});
    return;
  }

  BirthdaysData.addBirthday({date, name});

  res.status(200).send({date, name});
}

module.exports = addBirthday;
