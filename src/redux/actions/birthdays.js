import qs from 'querystring';
import {
  FETCH_BIRTHDAYS,
  FETCH_BIRTHDAYS_SUCCESS,
  FETCH_BIRTHDAYS_ERROR,
} from '../actionNames';

export const fetchBirthdays = (week, year) => async dispatch => {
  dispatch({type: FETCH_BIRTHDAYS});
  const response = await fetch(`api/birthdays?${qs.stringify({week, year})}`);
  if(!response.ok) {
    dispatch({
      type: FETCH_BIRTHDAYS_ERROR,
      payload: {error: response.error},
    });
    return;
  }
  const results = await response.json();
  dispatch({
    type: FETCH_BIRTHDAYS_SUCCESS,
    payload: {
      week,
      year,
      results,
    }
  });
};
