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

export const handleChange = (field, value) => (dispatch) => {
  dispatch({
    type: BIRTHDAY_FORM_SET_FIELD,
    payload: { field, value },
  });

  dispatch({
    type: BIRTHDAY_FORM_SET_ERROR,
    payload: {
      errors: {
        [field]: formValidations[field](value)
      },
    },
  })
};

export const validateForm = () => (dispatch, getState) => {
  const { birthdayForm: { values }} = getState();

  const errors = {
    name: formValidations['name'](values.name),
    date: formValidations['date'](values.date)
  }

  dispatch({
    type: BIRTHDAY_FORM_SET_ERROR,
    payload: { errors },
  });

  return !errors.name && !errors.date;
};

export const submitBirthdayForm = () => async (dispatch, getState) => {
  dispatch({ type: BIRTHDAY_FORM_SUBMIT });
  const { birthdayForm: { values }} = getState();

  try {
    await postNewBirthday(values);
    dispatch({
      type: BIRTHDAY_FORM_SUBMIT_SUCCESS,
      payload: values,
    })
    return true;
  }
  catch(error) {
    dispatch({
      type: BIRTHDAY_FORM_SUBMIT_ERROR,
      payload: { requestError: error.toString() },
    });
    return false;
  };
};

export const resetForm = () => dispatch => {
  dispatch({ type: BIRTHDAY_FORM_RESET });
};
