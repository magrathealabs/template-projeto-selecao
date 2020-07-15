import moment from 'moment';

import * as dispatches from '../../../redux/dispaches/birthday-form';
import birthdayFormReducer, { defaultState } from '../../../redux/reducers/birthday-form.reducer';

describe('birthdday-form reducer', () => {
  it('should start with correct defaultState', () => {
    expect(birthdayFormReducer(undefined, { type: 'DUMMY_ACTION' })).toEqual(defaultState);
  });

  it('should return the correct state on BIRTHDAY_FORM_SET_FIELD', () => {
    const field = 'name';
    const value = 'Louise von Test';

    expect(birthdayFormReducer(undefined, dispatches.setField(field, value)))
      .toEqual({
        ...defaultState,
        values: {
          ...defaultState.values,
          [field]: value,
        },
      });
  });

  it('should return the correct state on BIRTHDAY_FORM_SET_ERRORS', () => {
    const errors = {
      name: 'A name error.',
      date: 'A date error',
    };

    expect(birthdayFormReducer(undefined, dispatches.setErrors(errors)))
      .toEqual({
        ...defaultState,
        errors: {
          ...defaultState.errors,
          ...errors,
        },
      });
  });

  it('should return the correct state on BIRTHDAY_FORM_SUBMIT', () => {
    expect(birthdayFormReducer(undefined, dispatches.submitBirthdayRequest()))
      .toEqual({
        ...defaultState,
        isLoading: true,
      });
  });

  it('should return the correct state on BIRTHDAY_FORM_SUCCESS', () => {
    expect(birthdayFormReducer(undefined, dispatches.submitBirthdaySuccess()))
      .toEqual({
        ...defaultState,
        isLoading: false,
        requestError: '',
      });
  });

  it('should return the correct state on BIRTHDAY_FORM_ERROR', () => {
    const requestError = 'A request error for testing purposes!';

    expect(birthdayFormReducer(undefined, dispatches.submitBirthdayError(requestError)))
      .toEqual({
        ...defaultState,
        isLoading: false,
        requestError,
      });
  });

  it('should return the correct state on BIRTHDAY_FORM_RESET:', () => {
    const state = {
      ...defaultState,
      values: {
        name: 'Louise von Test',
        date: moment(),
      },
    };
    expect(birthdayFormReducer(state, dispatches.resetBirthdayForm()))
      .toEqual({
        ...defaultState,
      });
  });
});
