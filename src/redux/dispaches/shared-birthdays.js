import {
  SET_NEW_USER,
  FETCH_SHARED_BIRTHDAYS,
  FETCH_SHARED_BIRTHDAYS_SUCCESS,
  FETCH_SHARED_BIRTHDAYS_ERROR,
  CLEAR_SHARED_BIRTHDAYS,
} from '../actionNames';

export const setNewUser = (name, date) => ({
  type: SET_NEW_USER,
  payload: { name, date },
});

export const fetchSharedBirthdaysRequest = () => ({ type: FETCH_SHARED_BIRTHDAYS });

export const fetchSharedBirthdaysSuccess = (sameAge, sameBirthday) => ({
  type: FETCH_SHARED_BIRTHDAYS_SUCCESS,
  payload: { sameAge, sameBirthday },
});

export const fetchSharedBirthdaysError = (error) => ({
  type: FETCH_SHARED_BIRTHDAYS_ERROR,
  payload: { error },
});

export const clearSharedBirthdays = () => ({ type: CLEAR_SHARED_BIRTHDAYS });
