import MockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import context from 'jest-plugin-context';
import moment from 'moment';

import * as actions from '../../../redux/actions/birthday-form';
import * as dispatches from '../../../redux/dispaches/birthday-form';
import { defaultState as birthdayForm } from '../../../redux/reducers/birthday-form.reducer';

const API_URL = process.env.REACT_APP_API_URL;

describe('birthday form actions', () => {
  let store;

  const state = { birthdayForm };
  const mockStore = MockStore([thunk]);

  beforeEach(() => {
    store = mockStore(state);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('updateForm()', () => {
    it('dispatches a BIRTHDAY_FORM_SET_FIELD actions', () => {
      const field = 'name';
      const value = 'Louise von Test';

      const expectedActions = [
        dispatches.setField(field, value),
      ];

      store.dispatch(actions.updateForm(field, value));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('formValidation()', () => {
    it('dispatches a BIRTHDAY_FORM_SET_ERRORS actions', () => {
      const errors = {
        name: null,
        date: null,
      };

      const expectedActions = [
        dispatches.setErrors(errors),
      ];

      store.dispatch(actions.formValidation(errors));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('submitBirthdayForm()', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    context('when the request is successfull', () => {
      it('dispatches the BIRTHDAY_FORM_SUBMIT and BIRTHDAY_FORM_SUBMIT_SUCCESS actions', async() => {
        const url = `${API_URL}/birthdays`;

        const form = {
          name: 'Louise von Test',
          date: moment(),
        };

        fetch.mockResponseOnce(JSON.stringify({ data: form }));

        const expectedActions = [
          dispatches.submitBirthdayRequest(),
          dispatches.submitBirthdaySuccess(form),
        ];

        await store.dispatch(actions.submitBirthdayForm(form));

        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual(url)

        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    context('when the request is unsuccessful', () => {
      it('dispatches BIRTHDAY_FORM_SUBMIT and BIRTHDAY_FORM_SUBMIT_ERROR actions', async() => {
        const url = `${API_URL}/birthdays`;

        const form = {
          name: 'Louise von Test',
          date: moment(),
        };

        const error = new Error('An error message for testing purposes!');

        fetch.mockRejectOnce(error);

        const expectedActions = [
          dispatches.submitBirthdayRequest(),
          dispatches.submitBirthdayError(error.toString()),
        ];

        await store.dispatch(actions.submitBirthdayForm(form));

        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual(url)

        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('resetForm()', () => {
    it('dispatches a BIRTHDAY_FORM_RESET actions', () => {

      const expectedActions = [
        dispatches.resetBirthdayForm(),
      ];

      store.dispatch(actions.resetForm());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
