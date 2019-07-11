import { combineReducers } from 'redux';

import birthdays from './birthdays.reducer';
import birthdayForm from './birthday-form.reducer';

export default combineReducers({
  birthdays,
  birthdayForm,
});
