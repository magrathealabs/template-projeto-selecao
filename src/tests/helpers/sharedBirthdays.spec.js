import context from 'jest-plugin-context';

import { removeUser } from '../../helpers/sharedBirthdays';

describe('sharedBirthdays helpers', () => {
  describe('removeUser()', () => {
    context('when the user is present at the list', () => {
      it('returns the birthday list without the username passed', () => {
        const birthdayList = ['Louise von Test', 'Mary du Test'];
        const userName = birthdayList[0];

        const _birthdayList = removeUser(userName, birthdayList);
        expect(_birthdayList).not.toContain(userName);
        expect(_birthdayList).toHaveLength(birthdayList.length-1);
      });
    });

    context('when the user is not present on the birthday list', () => {
      it('returns the birthday list without changes', () => {
        const birthdayList = ['Louise von Test', 'Mary du Test'];
        const userName = 'Miss von Test IV';

        const _birthdayList = removeUser(userName, birthdayList);
        expect(_birthdayList).not.toContain(userName);
        expect(_birthdayList).toHaveLength(birthdayList.length);
        expect(_birthdayList).toEqual(birthdayList);
      });
    });
  });
});
