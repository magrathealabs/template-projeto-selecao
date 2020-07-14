import { postNewBirthday } from '../../services/api';
import * as formDispatches from '../dispaches/birthday-form';

export const updateForm = (field, value) => (dispatch) => {
  dispatch(formDispatches.setField(field, value));
};

export const formValidation = (errors) => (dispatch) => {
  dispatch(formDispatches.setErrors(errors));
};

export const submitBirthdayForm = (form) => async (dispatch) => {
  dispatch(formDispatches.submitBirthdayRequest());
  try {
    await postNewBirthday(form);
    dispatch(formDispatches.submitBirthdaySuccess())
    return true;
  }
  catch(error) {
    dispatch(formDispatches.submitBirthdayError(error.toString()));
    return false;
  };
};

export const resetForm = () => dispatch => {
  dispatch(formDispatches.resetBirthdayForm());
};
