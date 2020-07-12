import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import {
  fetchSharedBirthdays,
  resetSharedBirthdays,
} from '../../redux/actions/shared-birthdays';
import '../../styles/balloon.scss';
import './style.scss';

const SharedBirthdays = ({
  history,
  name,
  date,
  sameAge,
  sameBirthday,
  isLoaded,
  fetchSharedBirthdays,
}) => {

  useEffect(() => {
    if(date) {
      fetchSharedBirthdays(date);
    } else  {
      history.push('/');
    }
    return resetSharedBirthdays;
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="contained shared-birthdays">
      <h3 className="shared-birthdays__title">
        Welcome
        <span className="shared-birthdays__title-name">
          {name}
        </span>
      </h3>

      {isLoaded &&
        <div className="shared-birthdays__cards">
          <div className="shared-birthdays__card-container">
            <div className="balloon">
              <span>{moment(date).format('DD/MMM')}</span>
            </div>
            <div className="shared-birthdays__card">
              <p className="shared-birthdays__card-title">
                Users with the same birthday:
              </p>
              {!!sameBirthday.length
                ? sameBirthday.map((username, index) => (
                <span key={index} className="shared-birthdays__card-name">
                  {username}
                </span>
                ))
                : <span>Well... no one shares your birthday yet.</span>
              }
            </div>
          </div>

          <div className="shared-birthdays__card-container">
            <div className="balloon">
              <span>{moment().diff(date, 'year')}</span>
              <span>Years Old</span>
            </div>
            <div className="shared-birthdays__card">
              <p className="shared-birthdays__card-title">
                Users with the same age:
              </p>
              {!!sameAge.length
                ? sameAge.map((username, index) => (
                <span key={index} className="shared-birthdays__card-name">
                  {username}
                </span>
                ))
                : <span>Well... no one shares your age yet.</span>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

SharedBirthdays.propTypes = {
  history: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  sameAge: PropTypes.array.isRequired,
  sameBirthday: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  fetchSharedBirthdays: PropTypes.func.isRequired,
}

const mapStateToProps = ({sharedBirthdays}) => ({
  ...sharedBirthdays,
});

export default compose(
  connect(mapStateToProps, {fetchSharedBirthdays}),
  withRouter,
)(SharedBirthdays);
