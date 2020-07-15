import moment from 'moment';

import * as dispatches from '../../../redux/dispaches/shared-birthdays';
import sharedBirthdaysReducer, { defaultState } from '../../../redux/reducers/shared-birthdays.reducer';
import sharedBirthdaysMock from '../../mock/shared-birthdays';

describe('shared-birthddays reducer', () => {
  const { sameAge, sameBirthday } = sharedBirthdaysMock;

  it('should start with correct defaultState', () => {
    expect(sharedBirthdaysReducer(undefined, { type: 'DUMMY_ACTION' })).toEqual(defaultState);
  });

  it('should return the correct state on SET_NEW_USER', () => {
    const name = 'Louise von Test';
    const date = moment();

    expect(sharedBirthdaysReducer(undefined, dispatches.setNewUser(name, date)))
      .toEqual({
        ...defaultState,
        name,
        date,
      });
  });

  it('should return the correct state on FETCH_SHARED_BIRTHDAYS', () => {
    expect(sharedBirthdaysReducer(undefined, dispatches.fetchSharedBirthdaysRequest()))
      .toEqual({
        ...defaultState,
        isFetching: true,
      });
  });

  it('should return the correct state on FETCH_SHARED_BIRTHDAYS_SUCCESS', () => {
    expect(sharedBirthdaysReducer(undefined, dispatches.fetchSharedBirthdaysSuccess(sameAge, sameBirthday)))
      .toEqual({
        ...defaultState,
        isFetching: false,
        isLoaded: true,
        sameAge,
        sameBirthday,
      });
  });

  it('should return the correct state on FETCH_SHARED_BIRTHDAYS_ERROR', () => {
    const error = 'A request error for testing purposes!';

    expect(sharedBirthdaysReducer(undefined, dispatches.fetchSharedBirthdaysError(error)))
      .toEqual({
        ...defaultState,
        isFetching: false,
        isLoaded: true,
        error,
      });
  });

  it('should return the correct state on CLEAR_SHARED_BIRTHDAYS:', () => {
    const state = {
      ...defaultState,
      name: 'Louise von Test',
      date: moment(),
      sameAge,
      sameBirthday,
    };
    expect(sharedBirthdaysReducer(state, dispatches.clearSharedBirthdays()))
      .toEqual({
        ...defaultState,
      });
  });
});
