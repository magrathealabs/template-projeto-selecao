import React from 'react';
import Calendar from 'react-calendar';
import ClassNames from 'classnames'

import './style.scss';

export default ({
  error,
  ...props
}) => (
  <Calendar
    {...props}
    className={ClassNames(
      'calendar',
      {'calendar--error': !!error},
    )}
    calendarType="US"
  />
)
