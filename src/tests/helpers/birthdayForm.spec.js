import moment from 'moment';
import context from 'jest-plugin-context';

import { validateField, validateForm } from '../../helpers/birthdayForm';

describe('birthdayForm helpers', () => {
  describe('validateField()', () => {
    context('with field = name', () => {
      const field = 'name';

      it('returns null with a valid value', () => {
        const value = 'Louise von test';
        expect(validateField(field, value)).toBe(null);
      });

      it('returns an error message with an invalid value', () => {
        const value = '';
        expect(validateField(field, value)).not.toBe(null);
      });
    });

    context('with field = date', () => {
      const field = 'date';

      it('returns null with a valid value', () => {
        const value = moment();
        expect(validateField(field, value)).toBe(null);
      });

      it('returns an error message with an invalid value', () => {
        const value = '';
        expect(validateField(field, value)).not.toBe(null);
      });
    });
  });

  describe('validateForm()', () => {
    context('with valid values', () => {
      it('returns a valid response', () => {
        const form = {
          name: 'Louise von Test',
          date: moment(),
        };

        const validation = validateForm(form);
        expect(validation.isValid).toBe(true);
        expect(validation.errors.name).toBe(null);
        expect(validation.errors.date).toBe(null);
      })
    });
    context('with invalid values', () => {
      it('returns a not valid response', () => {
        const form = {
          name: '',
          date: '',
        };

        const validation = validateForm(form);
        expect(validation.isValid).toBe(false);
        expect(validation.errors.name).not.toBe(null);
        expect(validation.errors.date).not.toBe(null);
      })
    });
  });
});
