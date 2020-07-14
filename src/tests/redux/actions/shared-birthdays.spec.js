import MockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import context from 'jest-plugin-context';
import moment from 'moment';

import * as actions from '../../../redux/actions/shared-birthdays';
import * as dispatches from '../../../redux/dispaches/shared-birthdays';
import { defaultState as sharedBirthdays } from '../../../redux/reducers/shared-birthdays.reducer';
import sharedBirthdaysMock from '../../mock/shared-birthdays';

const API_URL = process.env.REACT_APP_API_URL;

describe('birthdays actions', () => {
  let store;

  const state = { sharedBirthdays };
  const mockStore = MockStore([thunk]);

  beforeEach(() => {
    store = mockStore(state);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('setNewUser()', () => {
    it('dispatches a SET_NEW_USER actions', () => {
      const name = 'Louise von Test';
      const date = moment();

      const expectedActions = [
        dispatches.setNewUser(name, date),
      ];

      store.dispatch(actions.setNewUser(name, date));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('fetchSharedBirthdays()', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    context('when the request is successfull', () => {
      it('dispatches the FETCH_SHARED_BIRTHDAYS and FETCH_SHARED_BIRTHDAYS_SUCCESS actions', async() => {
        const date = moment();
        const parsedDate = date.format('MM-DD-YYYT');
        const url = `${API_URL}/birthdays/${parsedDate}`;

        fetch.mockResponseOnce(JSON.stringify(sharedBirthdaysMock));

        const expectedActions = [
          dispatches.fetchSharedBirthdaysRequest(),
          dispatches.fetchSharedBirthdaysSuccess(
            sharedBirthdaysMock.sameAge,
            sharedBirthdaysMock.sameBirthday,
          ),
        ];

        await store.dispatch(actions.fetchSharedBirthdays(date));

        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual(url)

        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    context('when the request is unsuccessful', () => {
      it('dispatches the FETCH_SHARED_BIRTHDAYS and FETCH_BIRTHDAYS_SHARED_ERROR actions', async() => {
        const date = moment();
        const parsedDate = date.format('MM-DD-YYYT');
        const url = `${API_URL}/birthdays/${parsedDate}`;

        const error = new Error('An error message for testing purposes!');

        fetch.mockRejectOnce(error);

        const expectedActions = [
          dispatches.fetchSharedBirthdaysRequest(),
          dispatches.fetchSharedBirthdaysError(error.toString()),
        ];

        await store.dispatch(actions.fetchSharedBirthdays(date));

        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual(url)

        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('clearSharedBirthdays()', () => {
    it('dispatches a CLEAR_SHARED_BIRTHDAYS action', () => {

      const expectedActions = [
        dispatches.clearSharedBirthdays(),
      ];

      store.dispatch(actions.clearSharedBirthdays());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
