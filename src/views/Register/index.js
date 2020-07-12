import React, { useEffect } from 'react';
import moment from 'moment';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import {
  handleChange,
  validateForm,
  resetForm,
  submitBirthdayForm,
} from '../../redux/actions/birthday-form';
import ErrorMessage from '../../components/ErrorMessage';
import Calendar from '../../components/Calendar';
import './style.scss';

const Register = ({
  formValues,
  formErrors,
  requestError,
  history,
  handleChange,
  validateForm,
  resetForm,
  submitBirthdayForm,
}) => {
  useEffect(() => resetForm, []);// eslint-disable-line react-hooks/exhaustive-deps

  const submit = async(e) => {
    e.preventDefault();

    if(!validateForm()) {
      return;
    }

    const successful = await submitBirthdayForm();
    if(successful) {
      resetForm();
      history.push('/shared');
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
              {'register__input--error': !!formErrors.name},
            )}
            value={formValues.name}
            onChange={e => handleChange('name', e.target.value)}
          />
          <ErrorMessage error={formErrors.name} />
        </div>

        <div className="register__form-group">
          <label className="register__label">
            Birthday
          </label>
          <Calendar
            error={!!formErrors.date}
            onClickDay={date => handleChange('date', moment(date))}
            maxDate={moment().toDate()}
          />
          <ErrorMessage error={formErrors.date} />
        </div>

        {!!requestError &&
          <div className="register__error-container">
            <p className="register__error">
              Error on request:
            </p>
            <p className="register__error">
              { requestError }
            </p>
          </div>
        }

        <button type="submit" className="register__button">
          Save
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  formValues: state.birthdayForm.values,
  formErrors: state.birthdayForm.errors,
  requestError: state.birthdayForm.requestError,
  isLoading: state.birthdayForm.isLoading,
});

export default connect(
  mapStateToProps,
  {
    handleChange,
    validateForm,
    resetForm,
    submitBirthdayForm
  },
)(Register);
