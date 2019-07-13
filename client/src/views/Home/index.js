import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { fetchBirthdays } from '../../redux/actions/birthdays';
import Calendar from '../../components/calendar';
import Modal from '../../components/modal';
import './birthday-card.scss';
import './flip.scss';
import '../../components/balloon.scss';

const Home =  ({
  birthdays,
  isFetching,
  isLoaded,
  fetchBirthdays,
  week,
  year,
}) => {
  moment("12-12-1212", "MM-DD-YYYY");

  const [showModal, setShowModal] = useState(false);
  const [inProp, setInProp] = useState(false);
  const [selectedCard, selectCard] = useState(-1);
  const [weekList, setWeekList] = useState(birthdays);

  useEffect(() => {
    if(!isFetching && isLoaded) {
      setInProp(true);
    }
  }, [ birthdays, isFetching, isLoaded ]);

  useEffect(() => {
    fetchBirthdays(week, year)
  }, []);

  const getNextWeek = () => {
    const nextWeek = moment().weekYear(year).week(week).add(1, 'w');
    fetchBirthdays(nextWeek.week(), nextWeek.weekYear());
  }
  const getPreviousWeek = () => {
    const previousWeek = moment().weekYear(year).week(week).subtract(1, 'w');
    fetchBirthdays(previousWeek.week(), previousWeek.weekYear());
  }

  return (
    <div className="birthday contained">
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <Calendar
          activeStartDate={moment(weekList[0].date).toDate()}
          onClickDay={day => {
            const date = moment(day);
            fetchBirthdays(date.week(), date.weekYear());
            setShowModal(false);
          }}
        />
      </Modal>
      <button className="birthday__calendar-button" onClick={() => setShowModal(true)}>
        {moment(weekList[0].date).format('DD/MMM')} - {moment(weekList[6].date).format('DD/MMM')}
      </button>
      <CSSTransition
        in={inProp}
        timeout={400}
        onEntered={()=> {
          setInProp(false);
          selectCard(-1);
          setWeekList(birthdays);
        }}
      ><div/></CSSTransition>
      <div className="birthday__button-group">
        <button
          className="birthday__button"
          onClick={getPreviousWeek}
        >
          {'<'}
        </button>
        <button
          className="birthday__button"
          onClick={getNextWeek}
        >
          {'>'}
        </button>
      </div>
      <div className="birthday-card__list">
        {weekList.map((day, index) => {
          const date = moment(day.date);
          return (
            <div className="birthday-card__container" key={index}>
              <div className="balloon"/>
              <CSSTransition
                in={inProp}
                timeout={400}
                classNames="flip"
              >
                <div
                  onClick={() => selectCard(index === selectedCard ? -1 : index)}
                  className={ClassNames(
                    'birthday-card',
                    {'birthday-card--selected': selectedCard === index},
                  )}
                >
                  <span className="birthday-card__date">
                    {date.format('dddd')}
                  </span>
                  <span className="birthday-card__date">
                    {date.format('DD/MMM')}
                  </span>
                  <ul>
                    {day.birthdays.length
                      ? day.birthdays.map((birthday, birthdayIndex) => <li key={birthdayIndex} className="birthday-card__name">{birthday}</li>)
                      : <li>No Birthdays today :(</li>
                    }
                  </ul>
                </div>
              </CSSTransition>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = ({birthdays : {
  results,
  isFetching,
  isLoaded,
  week,
  year,
}}) => ({
  birthdays: results,
  isLoaded,
  isFetching,
  week,
  year,
});

export default connect(
  mapStateToProps,
  {fetchBirthdays}
)(Home);
