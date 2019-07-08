import moment from 'moment';
import {
  FETCH_BIRTHDAYS,
  FETCH_BIRTHDAYS_SUCCESS,
  ADD_BIRTHDAY_SUCCESS,
} from '../actionNames';

const defaultState = {
  results: [
    {
      date: moment().day(0),
      birthdays: []
    },
    {
      date: moment().day(1),
      birthdays: []
    },
    {
      date: moment().day(2),
      birthdays: []
    },
    {
      date: moment().day(3),
      birthdays: []
    },
    {
      date: moment().day(4),
      birthdays: []
    },
    {
      date: moment().day(5),
      birthdays: []
    },
    {
      date: moment().day(6),
      birthdays: []
    },
  ],
  isFetching: false,
  isLoaded: false,
  week: '',
  year: '',
};

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case FETCH_BIRTHDAYS:
      return  {
        ...state,
        isFetching: true,
      };
    case FETCH_BIRTHDAYS_SUCCESS:
      return {
        ...state,
        results: payload.results,
        week: payload.week,
        year: payload.year,
        isFetching: false,
        isLoaded: true,
      };
    default:
      return state;
  }
};
