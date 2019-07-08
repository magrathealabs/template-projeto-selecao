import moment from 'moment'
import {
  FETCH_BIRTHDAYS_SUCCESS,
  ADD_BIRTHDAY_SUCCESS,
} from '../actionNames';

export const fetchBirthdays = (week, year) => dispatch => {
  dispatch({
    type: FETCH_BIRTHDAYS_SUCCESS,
    payload: {
      week,
      year,
      results: [
        {
          date: moment().day(0),
          birthdays: [
            'Darragh Leon',
            'Orlaith Tait',
            'Eduard Humphries',
            'Alessia Knox',
            'Jerry Craft',
            'Ebony Davison',
            'Kyra Huang',
            'Jodi Blundel',
            'Aiyla Bennett',
            'Yuvaan Akhtar',
          ]
        },
        {
          date: moment().day(1),
          birthdays: [
            'Menna Wade',
            'Lilli Butler',
            'Star Barrett',
            'Meerab Travers',
          ]
        },
        {
          date: moment().day(2),
          birthdays: [
            'Kristi Castillo',
            'Ellie-Mai Dalby',
            'Aliza Morley',
            'Rukhsar Stokes',
            'Marianne Ahmad',
            'Janice Small',
          ]
        },
        {
          date: moment().day(3),
          birthdays: [
            'Lila Sparks',
            'Mariyam Pruitt',
          ]
        },
        {
          date: moment().day(4),
          birthdays: [
            'Aras Dunlop',
            'Karolina Mccartney',
            'Lorcan Morley',
            'Onur Metcalfe',
          ]
        },
        {
          date: moment().day(5),
          birthdays: [
            'Anees Beard',
            'Angelica Woodward',
            'Destiny Whitehead',
            'Karim Samuels',
          ]
        },
        {
          date: moment().day(6),
          birthdays: [
            'Esme Esquivel',
            'Ubaid Cherry',
            'Kate Blair',
            'Janelle Ayers',
            'Aliya Healy',
            'Marley Mccallum',
          ]
        },
      ],
    }
  });
};
