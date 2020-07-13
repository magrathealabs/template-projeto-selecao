import qs from 'querystring';
import moment from 'moment';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const postNewBirthday = async({ date, name }) => {
  const response = await fetch(`${API_URL}/birthdays`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: date.format("MM-DD-YYYY"),
      name,
    }),
  });

  if(!response.ok) {
    throw response.statusText;
  }

  return response.json();
};

export const getBirthdays = async(week, year) => {
  const response = await fetch(`${API_URL}/birthdays?${qs.stringify({ week, year })}`);

  if(!response.ok) {
    throw response.statusText;
  }

  return response.json();
};

export const getSharedBirthdays = async(date) => {
  const parsedDate = moment(date).format('MM-DD-YYYT');
  const response = await fetch(`${API_URL}/birthdays/${parsedDate}`);

  if(!response.ok) {
    throw response.statusText;
  }

  return response.json();
}
