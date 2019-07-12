const moment = require('moment');
const _birthdays = require('./birthdays');

const BirthdaysData = {
  getByDate: date => {
    const month = moment(date).format('MM');
    const day = moment(date).format('DD');
    return _birthdays[`${month}-${day}`].map( user => user.name);
  },

  getByYear: date => Object.keys(_birthdays).reduce(
    (acc, day) => acc.concat(_birthdays[day].filter(
      user => (moment(`${user.year}-${day}`).diff(date, 'year') === 0)
    ).map(user => user.name)),
    []
  ),

  addBirthday: ({date, name}) => {
    const month = moment(date).format('MM');
    const day = moment(date).format('DD');

    _birthdays[`${month}-${day}`] = [
      ..._birthdays[`${month}-${day}`],
      {
        name,
        year: moment(date).year()
      }
    ];
  },

  getWeek: (week, year) => {
    const date = moment().weekYear(year).week(week);

    const newWeek = [];
    for(let d = 0; d<7; d++) {
      const day = moment(date).day(d);
      newWeek.push({
        date: day,
        birthdays: _birthdays[`${day.format('MM')}-${day.format('DD')}`].map(birthday => birthday.name),
      })
    }
    return newWeek;
  },
  getAll: () => _birthdays,
}

Object.freeze(BirthdaysData);

module.exports = BirthdaysData;
