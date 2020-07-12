import React from 'react';
import ClassNames from 'classnames'
import PropTypes from 'prop-types';

import './style.scss';
import '../../styles/flip.scss';

const BirthdayCard = ({
  handleClick,
  cardSelected,
  date,
  birthdays,
  error,
}) => (
  <div
    onClick={handleClick}
    className={ClassNames(
      'birthday-card',
      {
        'birthday-card--selected': cardSelected,
        'birthday-card--error': !!error,
      },
    )}
  >
    {!!error
      ? (
        <>
          <p className="birthday-card__error">
            The following error occurred:
          </p>
          <p className="birthday-card__error">
            {error}
          </p>
        </>
      ) : (
        <>
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
        </>
      )
    }
  </div>
);

BirthdayCard.propTypes = {
  handleClick: PropTypes.func.isRequired,
  cardSelected: PropTypes.bool.isRequired,
  date: PropTypes.object,
  birthdays: PropTypes.array,
  error: PropTypes.string,
};

export default BirthdayCard;
