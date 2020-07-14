import {
  BIRTHDAY_FORM_SET_FIELD,
  BIRTHDAY_FORM_SET_ERRORS,
  BIRTHDAY_FORM_SUBMIT,
  BIRTHDAY_FORM_SUBMIT_SUCCESS,
  BIRTHDAY_FORM_SUBMIT_ERROR,
  BIRTHDAY_FORM_RESET,
} from '../actionNames';

export const setField = (field, value) => ({
  type: BIRTHDAY_FORM_SET_FIELD,
  payload: { field, value },
});

export const setErrors = (errors) => ({
  type: BIRTHDAY_FORM_SET_ERRORS,
  payload: { errors },
});

export const submitBirthdayRequest = () => ({ type: BIRTHDAY_FORM_SUBMIT });

export const submitBirthdaySuccess = () => ({
  type: BIRTHDAY_FORM_SUBMIT_SUCCESS,
});

export const submitBirthdayError = (requestError) => ({
  type: BIRTHDAY_FORM_SUBMIT_ERROR,
  payload: { requestError },
});

export const resetBirthdayForm = () => ({ type: BIRTHDAY_FORM_RESET });
