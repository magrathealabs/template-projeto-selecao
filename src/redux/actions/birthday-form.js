import { postNewBirthday } from '../../services/api';
import { formValidations } from '../../helpers/birthdayForm';
import {
  BIRTHDAY_FORM_SET_FIELD,
  BIRTHDAY_FORM_SET_ERROR,
  BIRTHDAY_FORM_RESET,
  BIRTHDAY_FORM_SUBMIT,
  BIRTHDAY_FORM_SUBMIT_SUCCESS,
  BIRTHDAY_FORM_SUBMIT_ERROR,
} from '../actionNames';

export const handleChange = (field, value) => (dispatch, getState) => {
  dispatch({
    type: BIRTHDAY_FORM_SET_FIELD,
    payload: { field, value },
  });
  const { birthdayForm: { error } } = getState();

  dispatch({
    type: BIRTHDAY_FORM_SET_ERROR,
    payload: {
      error: {
        ...error,
        [field]: formValidations[field](value)
      },
    },
  })
};

export const validateForm = () => (dispatch, getState) => {
  const { birthdayForm: { name, date }} = getState();

  const error = {
    name: formValidations['name'](name),
    date: formValidations['date'](date)
  }

  dispatch({
    type: BIRTHDAY_FORM_SET_ERROR,
    payload: { error },
  });

  return !error.name && !error.date;
};

export const submitBirthdayForm = () => async (dispatch, getState) => {
  dispatch({ type: BIRTHDAY_FORM_SUBMIT });
  const { birthdayForm } = getState();

  try {
    await postNewBirthday(birthdayForm);
    dispatch({
      type: BIRTHDAY_FORM_SUBMIT_SUCCESS,
      payload: birthdayForm,
    })
    return;
  }
  catch(error) {
    dispatch({
      type: BIRTHDAY_FORM_SUBMIT_ERROR,
      payload: { error },
    });
  };
};

export const resetForm = () => dispatch => {
  dispatch({ type: BIRTHDAY_FORM_RESET });
};
