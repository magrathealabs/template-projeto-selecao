import { combineReducers } from 'redux';

import birthdays from './birthdays.reducer';
import birthdayForm from './birthday-form.reducer';
import sharedBirthdays from './shared-birthdays.reducer';

export default combineReducers({
  birthdays,
  birthdayForm,
  sharedBirthdays,
});
