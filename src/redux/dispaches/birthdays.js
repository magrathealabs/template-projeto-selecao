import {
  FETCH_BIRTHDAYS,
  FETCH_BIRTHDAYS_SUCCESS,
  FETCH_BIRTHDAYS_ERROR,
} from '../actionNames';

export const fetchBirthdaysRequest = () => ({ type: FETCH_BIRTHDAYS });

export const fetchBirthdaysSuccess = (week, year, results) => ({
  type: FETCH_BIRTHDAYS_SUCCESS,
  payload: { week, year, results },
});

export const fetchBirthdaysError = (error) => ({
  type: FETCH_BIRTHDAYS_ERROR,
  payload: { error },
});
