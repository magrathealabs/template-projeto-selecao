const moment = require('moment');
const jan = require('./jan');
const feb = require('./feb');
const mar = require('./mar');
const apr = require('./apr');
const may = require('./may');
const jun = require('./jun');
const jul = require('./jul');
const aug = require('./aug');
const sep = require('./sep');
const oct = require('./oct');
const nov = require('./nov');
const dec = require('./dec');

const _birthdays = {
  '1': {...jan},
  '2': {...feb},
  '3': {...mar},
  '4': {...apr},
  '5': {...may},
  '6': {...jun},
  '7': {...jul},
  '8': {...aug},
  '9': {...sep},
  '10': {...oct},
  '11': {...nov},
  '12': {...dec}
};

const BirthdaysData = {
  getByDate: date => {
    const month = moment(date).format('M');
    const day = moment(date).format('DD');
    return _birthdays[month][day];
  },

  addBirthday: ({date, name}) => {
    const month = moment(date).format('M');
    const day = moment(date).format('DD');
    _birthdays[month][day].push(name);
  },

  getWeek: (week, year) => {
    const date = moment().weekYear(year).week(week);

    const newWeek = [];
    for(let d = 0; d<7; d++) {
      const day = moment(date).day(d);
      newWeek.push({
        date: day,
        birthdays: _birthdays[day.format('M')][day.format('DD')]
      })
    }
    return newWeek;
  },
  getAll: () => _birthdays,
}

Object.freeze(BirthdaysData);

module.exports = BirthdaysData;
