import { SET_BIRTHDAY } from '../actionNames';

const defaultState = {
  date: '',
  username: '',
};

export default (state = defaultState, payload) => {
  switch (payload.type) {
    case SET_BIRTHDAY:
      return {
        ...state,
        ...payload.birthday,
      };
    default:
      return state;
  }
};
