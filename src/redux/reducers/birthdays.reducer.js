import moment from 'moment';
import {
  FETCH_BIRTHDAYS,
  FETCH_BIRTHDAYS_SUCCESS,
  FETCH_BIRTHDAYS_ERROR,
} from '../actionNames';

export const defaultState = {
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
  week: moment().week(),
  year: moment().weekYear(),
  error: '',
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case FETCH_BIRTHDAYS:
      return  {
        ...state,
        isFetching: true,
      };
    case FETCH_BIRTHDAYS_ERROR:
      return  {
        ...state,
        isFetching: false,
        error: payload.error,
      };
    case FETCH_BIRTHDAYS_SUCCESS:
      return {
        ...state,
        results: payload.results,
        week: payload.week,
        year: payload.year,
        isFetching: false,
        isLoaded: true,
        error: '',
      };
    default:
      return state;
  }
};
