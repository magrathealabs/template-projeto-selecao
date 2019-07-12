import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
  fetchSharedBirthdays,
  resetSharedBirthdays,
} from '../../redux/actions/shared-birthdays';
import './shared-birthdays.scss';
import '../../components/balloon.scss';

const SharedBirthdays = ({
  history,
  name,
  date,
  sameAge,
  sameBirthday,
  fetchSharedBirthdays,
  isLoaded,
}) => {

  useEffect(() => {
    if(date) {
      fetchSharedBirthdays(date);
    } else  {
      history.push('/');
    }
    return resetSharedBirthdays;
  }, [])

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
              <span>{moment(date).format('MM/DD')}</span>
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
              <span>{moment(date).diff(undefined, 'year')}</span>
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

const mapStateToProps = ({sharedBirthdays}) => ({
  ...sharedBirthdays,
});

export default compose(
  connect(mapStateToProps, {fetchSharedBirthdays}),
  withRouter,
)(SharedBirthdays);
