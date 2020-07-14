import {
  BIRTHDAY_FORM_SET_FIELD,
  BIRTHDAY_FORM_SET_ERRORS,
  BIRTHDAY_FORM_RESET,
  BIRTHDAY_FORM_SUBMIT,
  BIRTHDAY_FORM_SUBMIT_SUCCESS,
  BIRTHDAY_FORM_SUBMIT_ERROR,
} from '../actionNames';

export const defaultState = {
  values: {
    name: '',
    date: null,
  },
  errors: {
    name: null,
    date: null,
  },
  requestError: '',
  isLoading: false,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case BIRTHDAY_FORM_SET_FIELD:
      return  {
        ...state,
        values: {
          ...state.values,
          [payload.field]: payload.value,
        },
      };

    case BIRTHDAY_FORM_SET_ERRORS:
      return  {
        ...state,
        errors: {
          ...state.errors,
          ...payload.errors,
        },
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
        requestError: payload.requestError,
      };

    case BIRTHDAY_FORM_SUBMIT_SUCCESS:
      return  {
        ...state,
        isLoading: false,
        requestError: defaultState.requestError,
      };

    case BIRTHDAY_FORM_RESET:
      return defaultState;

    default:
      return state;
  }
};
