import moment from 'moment';

import * as dispatches from '../../../redux/dispaches/birthdays';
import birthdaysReducer, { defaultState } from '../../../redux/reducers/birthdays.reducer';
import birthdaysMock from '../../mock/birthdays';

describe('birthdays reducer', () => {
  it('should start with correct defaultState', () => {
    expect(birthdaysReducer(undefined, { type: 'DUMMY_ACTION' })).toEqual(defaultState);
  });

  it('should return the correct state on FETCH_BIRTHDAYS', () => {
    expect(birthdaysReducer(undefined, dispatches.fetchBirthdaysRequest()))
      .toEqual({
        ...defaultState,
        isFetching: true,
      });
  });

  it('should return the correct state on FETCH_BIRTHDAYS_SUCCESS', () => {
    const week = moment().week();
    const year = moment().year();
    expect(birthdaysReducer(undefined, dispatches.fetchBirthdaysSuccess(week, year, birthdaysMock)))
      .toEqual({
        ...defaultState,
        results: birthdaysMock,
        week,
        year,
        isFetching: false,
        isLoaded: true,
        error: '',
      });
  });

  it('should return the correct state on FETCH_BIRTHDAYS_ERROR', () => {
    const error = 'An error message for testing purposes!';
    expect(birthdaysReducer(undefined, dispatches.fetchBirthdaysError(error)))
      .toEqual({
        ...defaultState,
        isFetching: false,
        error,
      });
  });
});
