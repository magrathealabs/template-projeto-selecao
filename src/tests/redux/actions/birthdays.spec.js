import MockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import context from 'jest-plugin-context';
import moment from 'moment';
import qs from 'querystring';

import * as actions from '../../../redux/actions/birthdays';
import * as dispatches from '../../../redux/dispaches/birthdays';
import { defaultState as birthdays } from '../../../redux/reducers/birthdays.reducer';
import birthdaysMock from '../../mock/birthdays';

const API_URL = process.env.REACT_APP_API_URL;

describe('birthdays actions', () => {
  let store;

  const state = { birthdays };
  const mockStore = MockStore([thunk]);

  beforeEach(() => {
    store = mockStore(state);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchBirthdays()', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    context('when the request is successfull', () => {
      it('dispatches the FETCH_BIRTHDAYS and FETCH_BIRTHDAYS_SUCCESS actions', async() => {
        const week = moment().week();
        const year = moment().year();
        const url = `${API_URL}/birthdays?${qs.stringify({ week, year })}`;

        fetch.mockResponseOnce(JSON.stringify(birthdaysMock));

        const expectedActions = [
          dispatches.fetchBirthdaysRequest(),
          dispatches.fetchBirthdaysSuccess(week, year, birthdaysMock),
        ];

        await store.dispatch(actions.fetchBirthdays(week, year));

        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual(url)

        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    context('when the request is unsuccessful', () => {
      it('dispatches the FETCH_BIRTHDAYS and FETCH_BIRTHDAYS_ERROR actions', async() => {
        const week = moment().week();
        const year = moment().year();
        const url = `${API_URL}/birthdays?${qs.stringify({ week, year })}`;

        const error = new Error('An error message for testing purposes!');

        fetch.mockRejectOnce(error);

        const expectedActions = [
          dispatches.fetchBirthdaysRequest(),
          dispatches.fetchBirthdaysSuccess(error.toString()),
        ];

        await store.dispatch(actions.fetchBirthdays(week, year));

        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual(url)

        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
