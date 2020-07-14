import { getBirthdays } from '../../services/api';
import * as birthdaysDispatches from '../dispaches/birthdays';

export const fetchBirthdays = (week, year) => async dispatch => {
  dispatch(birthdaysDispatches.fetchBirthdaysRequest());

  try {
    const results = await getBirthdays(week, year);
    dispatch(birthdaysDispatches.fetchBirthdaysSuccess(week, year, results));
  }
  catch(error) {
    dispatch(birthdaysDispatches.fetchBirthdaysSuccess(error.toString()));
  }
};
