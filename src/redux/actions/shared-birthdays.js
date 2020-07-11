import { getSharedBirthdays  } from '../../services/api';
import { removeUser } from '../../helpers/sharedBirthdays';
import {
  RESET_SHARED_BIRTHDAYS,
  FETCH_SHARED_BIRTHDAYS,
  FETCH_SHARED_BIRTHDAYS_SUCCESS,
  FETCH_SHARED_BIRTHDAYS_ERROR,
} from '../actionNames';

export const fetchSharedBirthdays = (date) => async (dispatch, getState) => {
  dispatch({type: FETCH_SHARED_BIRTHDAYS});

  let response;
  try {
    response = await getSharedBirthdays(date);
  }
  catch (error) {
    dispatch({
      type: FETCH_SHARED_BIRTHDAYS_ERROR,
      payload: {error},
    });
    return;
  }

  const { sharedBirthdays: { name }} = getState();

  dispatch({
    type: FETCH_SHARED_BIRTHDAYS_SUCCESS,
    payload: {
      sameAge: removeUser(name, response.sameAge),
      sameBirthday: removeUser(name, response.sameBirthday),
    },
  });
};

export const resetSharedBirthdays = () => dispatch => dispatch({ type: RESET_SHARED_BIRTHDAYS });
