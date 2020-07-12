import qs from 'querystring';
import moment from 'moment';

export const postNewBirthday = async({ date, name }) => {
  const response = await fetch(`api/birthdays`, {
    method: 'post',
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
  const response = await fetch(`api/birthdays?${qs.stringify({ week, year })}`);

  if(!response.ok) {
    throw response.statusText;
  }

  return response.json();
};

export const getSharedBirthdays = async(date) => {
  const parsedDate = moment(date).toDate().toString()
  const response = await fetch(`api/birthdays/${parsedDate}`);

  if(!response.ok) {
    throw response.statusText;
  }

  return response.json();
}
