import {
  BIRTHDAY_FORM_SET_FIELD,
  BIRTHDAY_FORM_SET_ERROR,
  BIRTHDAY_FORM_RESET,
  BIRTHDAY_FORM_SUBMIT,
  BIRTHDAY_FORM_SUBMIT_SUCCESS,
  BIRTHDAY_FORM_SUBMIT_ERROR,
} from '../actionNames';

const validations = {
  name: (name) => {
    var error = null;
    if(name === '') {
      error = 'Name is required.';
    }

    return error;
  },
  date: (date) => {
    var error = null;
    if(date === null) {
      error = 'Date is required.';
    }

    return error;
  },
}

export const handleChange = (field, value) => (dispatch, getState) => {
  dispatch({type: BIRTHDAY_FORM_SET_FIELD, payload: {field, value}});
  const { birthdayForm: {error} } = getState();

  dispatch({
    type: BIRTHDAY_FORM_SET_ERROR,
    payload: {error: {
      ...error,
      [field]: validations[field](value)
    }},
  })
};

export const validateForm = () => (dispatch, getState) => {
  const { birthdayForm: {
    name,
    date,
    error,
  } } = getState();
  const _error = {
    ...error,
    name: validations['name'](name),
    date: validations['date'](date)
  }
  dispatch({
    type: BIRTHDAY_FORM_SET_ERROR,
    payload: {error: _error},
  });
  return !_error.name && !_error.date;
};

export const submitForm = () => async (dispatch, getState) => {
  dispatch({type: BIRTHDAY_FORM_SUBMIT});
  const { birthdayForm: {date, name} } = getState();

  const response = await fetch(`api/birthdays`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({date, name}),
  });
  if(!response.ok) {
    dispatch({
      type: BIRTHDAY_FORM_SUBMIT_ERROR,
      payload: {error: response.error},
    });
    return;
  }
  dispatch({type: BIRTHDAY_FORM_SUBMIT_SUCCESS})
};

export const resetForm = () => dispatch => {
  dispatch({type: BIRTHDAY_FORM_RESET});
};
