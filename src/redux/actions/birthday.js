import { SET_BIRTHDAY } from '../actionNames';

export const setBirthday= birthday => dispatch => {
  dispatch({type: SET_BIRTHDAY, birthday});
};
