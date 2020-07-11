import React, { useEffect } from 'react';
import moment from 'moment';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import {
  handleChange,
  validateForm,
  resetForm,
  submitForm,
} from '../../redux/actions/birthday-form';
import ErrorMessage from '../../components/ErrorMessage';
import Calendar from '../../components/Calendar';
import './style.scss';

const Register = ({
  handleChange,
  validateForm,
  resetForm,
  submitForm,
  error,
  success,
  history,
}) => {
  useEffect(() => resetForm, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(success) {
      resetForm();
      history.push('/shared');
    }
  }, [success])// eslint-disable-line react-hooks/exhaustive-deps

  const submit = (e) => {
    e.preventDefault();

    if(validateForm()) {
      submitForm();
    }
  }

  return (
    <div className="contained register">
      <h3 className="register__title">
        New Birthday
      </h3>
      <form onSubmit={submit} className="register__form">
        <div className="register__form-group">
          <label className="register__label">
            User Name
          </label>
          <input
            type="text"
            className={ClassNames(
              'register__input',
              {'register__input--error': !!error.name},
            )}
            onChange={e => handleChange('name', e.target.value)}
          />
          <ErrorMessage error={error.name} />
        </div>

        <div className="register__form-group">
          <label className="register__label">
            Birthday
          </label>
          <Calendar
            error={!!error.date}
            onClickDay={day => handleChange('date', moment(day))}
            maxDate={moment().toDate()}
          />
          <ErrorMessage error={error.date} />
        </div>

        <button type="submit" className="register__button">
          Save
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = ({birthdayForm: {error, isLoading, success}}) => ({
  error,
  isLoading,
  success,
});

export default connect(
  mapStateToProps,
  {
    handleChange,
    validateForm,
    resetForm,
    submitForm,
  },
)(Register);
