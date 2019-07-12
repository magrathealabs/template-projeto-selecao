import {
  RESET_SHARED_BIRTHDAYS,
  FETCH_SHARED_BIRTHDAYS,
  FETCH_SHARED_BIRTHDAYS_SUCCESS,
  FETCH_SHARED_BIRTHDAYS_ERROR,
} from '../actionNames';

export const fetchSharedBirthdays = (date) => async (dispatch, getState) => {
  dispatch({type: FETCH_SHARED_BIRTHDAYS});
  const response = await fetch(`api/birthdays/${date.toString()}`);
  if(!response.ok) {
    dispatch({
      type: FETCH_SHARED_BIRTHDAYS_ERROR,
      payload: {error: response.error},
    });
    return;
  }

  const {sharedBirthdays: {name}} = getState();
  const removeUser = (list) => {
    const index = list.findIndex( _name => _name === name);

    if(index === -1) {
      return list;
    }

    list.splice(index, 1);
    return list;
  }

  const { sameAge, sameBirthday } = await response.json();
  dispatch({
    type: FETCH_SHARED_BIRTHDAYS_SUCCESS,
    payload: {
      sameAge: removeUser(sameAge),
      sameBirthday: removeUser(sameBirthday),
    }
  });
};

export const resetSharedBirthdays = () => dispatch => dispatch({type: RESET_SHARED_BIRTHDAYS});
