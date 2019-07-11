import {
  BIRTHDAY_FORM_SET_FIELD,
  BIRTHDAY_FORM_SET_ERROR,
  BIRTHDAY_FORM_RESET,
  BIRTHDAY_FORM_SUBMIT,
  BIRTHDAY_FORM_SUBMIT_SUCCESS,
  BIRTHDAY_FORM_SUBMIT_ERROR,
} from '../actionNames';

const defaultState = {
  name: '',
  date: null,
  error: {
    name: null,
    date: null,
  },
  submitError: '',
  isSubmiting: false,
};

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case BIRTHDAY_FORM_SET_FIELD:
      return  {
        ...state,
        [payload.field]: payload.value,
      };

    case BIRTHDAY_FORM_SET_ERROR:
      return  {
        ...state,
        error: payload.error,
      };

    case BIRTHDAY_FORM_SUBMIT:
      return  {
        ...state,
        isLoading: true,
      };

    case BIRTHDAY_FORM_SUBMIT_ERROR:
      return  {
        ...state,
        isLoading: false,
        submitError: payload.submitError,
      };

    case BIRTHDAY_FORM_RESET:
    case BIRTHDAY_FORM_SUBMIT_SUCCESS:
      return defaultState;

    default:
      return state;
  }
};
