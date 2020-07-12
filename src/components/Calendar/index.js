import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import ClassNames from 'classnames'

import './style.scss';

const CalendarComponent = ({
  error,
  ...props
}) => (
  <Calendar
    {...props}
    className={ClassNames(
      'calendar',
      {'calendar--error': error},
    )}
    calendarType="US"
  />
);

CalendarComponent.propTypes = {
  error: PropTypes.bool,
};

export default CalendarComponent;
