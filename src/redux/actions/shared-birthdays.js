import { getSharedBirthdays  } from '../../services/api';
import { removeUser } from '../../helpers/sharedBirthdays';
import * as sharedBirthdaysDispatches from '../dispaches/shared-birthdays';

export const setNewUser = (name, date) => (dispatch) =>
  dispatch(sharedBirthdaysDispatches.setNewUser(name, date));

export const fetchSharedBirthdays = (date, name) => async (dispatch) => {
  dispatch(sharedBirthdaysDispatches.fetchSharedBirthdaysRequest());

  try {
    const { sameAge, sameBirthday }= await getSharedBirthdays(date);

    dispatch(sharedBirthdaysDispatches.fetchSharedBirthdaysSuccess(
      removeUser(name, sameAge),
      removeUser(name, sameBirthday)
    ));
  }
  catch (error) {
    dispatch(sharedBirthdaysDispatches.fetchSharedBirthdaysError(error.toString()));
  }
};

export const clearSharedBirthdays = () => (dispatch) =>
  dispatch(sharedBirthdaysDispatches.clearSharedBirthdays());
