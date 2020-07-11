import { getBirthdays } from '../../services/api';
import {
  FETCH_BIRTHDAYS,
  FETCH_BIRTHDAYS_SUCCESS,
  FETCH_BIRTHDAYS_ERROR,
} from '../actionNames';

export const fetchBirthdays = (week, year) => async dispatch => {
  dispatch({type: FETCH_BIRTHDAYS});

  try {
    const results = await getBirthdays(week, year);
    dispatch({
      type: FETCH_BIRTHDAYS_SUCCESS,
      payload: { week, year, results },
    });
    return;
  }
  catch(error) {
    dispatch({
      type: FETCH_BIRTHDAYS_ERROR,
      payload: { error },
    });
    return;
  }
};
