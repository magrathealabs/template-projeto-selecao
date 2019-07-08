import React from 'react';
import Calendar from 'react-calendar';
import './register.scss';

export default () => {
  return (
    <div className="contained d-flex flex-column p-2">
      <h3 className="mb-lg-4">New Birthday</h3>
      <form className="register__form">
        <label className="register__label">
          User Name
        </label>
        <input type="text" className="register__input mb-2 mb-lg-4" />

        <label className="register__label">
          Birthday
        </label>
        <Calendar
          className="register__calendar align-self-lg-center"
          onChange={(day) => console.log(day)}
          calendarType="US"
        />

        <div className="register__button-container mt-3 mt-lg-5">
          <button className="register__button btn btn-success btn-block btn-lg px-lg-5">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
