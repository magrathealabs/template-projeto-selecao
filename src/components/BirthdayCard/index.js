import React from 'react';
import ClassNames from 'classnames'

import './style.scss';
import '../../styles/flip.scss';

const BirthdayCard = ({
  handleClick,
  cardSelected,
  date,
  birthdays,
}) => (
  <div
    onClick={handleClick}
    className={ClassNames(
      'birthday-card',
      {'birthday-card--selected': cardSelected},
    )}
  >
    <span className="birthday-card__date">
      {date.format('dddd')}
    </span>
    <span className="birthday-card__date">
      {date.format('DD/MMM')}
    </span>
    <ul>
      {birthdays.length
        ? birthdays.map((birthday, birthdayIndex) => (
          <li key={birthdayIndex} className="birthday-card__name">
            {birthday}
          </li>
        ))
        : <li>No Birthdays today :(</li>
      }
    </ul>
  </div>
);

export default BirthdayCard;
