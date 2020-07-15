import {
  SET_NEW_USER,
  FETCH_SHARED_BIRTHDAYS,
  FETCH_SHARED_BIRTHDAYS_SUCCESS,
  FETCH_SHARED_BIRTHDAYS_ERROR,
  CLEAR_SHARED_BIRTHDAYS,
} from '../actionNames';

export const defaultState = {
  name: '',
  date: null,
  sameAge: [],
  sameBirthday: [],
  isFetching: false,
  isLoaded: false,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_NEW_USER:
      return  {
        ...state,
        name: payload.name,
        date: payload.date,
      };

    case FETCH_SHARED_BIRTHDAYS:
      return  {
        ...state,
        isFetching: true,
      };

    case FETCH_SHARED_BIRTHDAYS_SUCCESS:
      return  {
        ...state,
        isFetching: false,
        isLoaded: true,
        sameAge: payload.sameAge,
        sameBirthday: payload.sameBirthday,
      };

    case FETCH_SHARED_BIRTHDAYS_ERROR:
      return  {
        ...state,
        isFetching: false,
        isLoaded: true,
        error: payload.error,
      };

    case CLEAR_SHARED_BIRTHDAYS:
      return  defaultState;

    default:
      return state;
  }
};
