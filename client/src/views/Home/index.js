import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { fetchBirthdays } from '../../redux/actions/birthdays';
import './birthday-card.scss';
import './flip.scss';

const Home =  ({
  birthdays,
  isFetching,
  isLoaded,
  fetchBirthdays,
}) => {
  const [inProp, setInProp] = useState(false);
  const [selectedCard, selectCard] = useState(-1);
  const [weekList, setWeekList] = useState(birthdays);

  useEffect(() => {
    if(!isFetching && isLoaded) {
      setInProp(true);
    }
  }, [ birthdays, isFetching, isLoaded ]);

  const next = () => {
    const today = moment();
    fetchBirthdays(today.isoWeek(), today.year());
  }

  const renderCardsLists = (start, end = weekList.length) => (
    <div className={ClassNames(
      'birthday-card__list my-lg-2',
      {'birthday-card__list--selected': selectedCard >= start && selectedCard < end}
    )}>
      {weekList.slice(start, end).map((day, index) => {
        const cardNumber = index + start;
        const date = moment(day.date);
        return (
          <CSSTransition
            in={inProp}
            timeout={400}
            classNames="flip"
            key={cardNumber}
          >
            <div
              onClick={() => selectCard(cardNumber === selectedCard ? -1 : cardNumber)}
              className={ClassNames(
                'birthday-card bg-warning m-2 my-lg-0',
                {'birthday-card--selected': selectedCard === cardNumber},
              )}
            >
              <span className="birthday-card__date">
                {date.format('dddd')}
              </span>
              <span className="birthday-card__date mb-3">
                {date.format('DD/MMM')}
              </span>
              <ul>
                {day.birthdays.length
                  ? day.birthdays.map((birthday, birthdayIndex) => <li key={birthdayIndex} className="birthday-card__name mb-1">{birthday}</li>)
                  : <li>No Birthdays today :(</li>
                }
              </ul>
            </div>
          </CSSTransition>
        )
      })}
    </div>
  )

  return (
    <div className="birthday contained p-2">
      <h3 className="birthday__title mb-4">Incoming Birthdays</h3>
      <CSSTransition
        in={inProp}
        timeout={400}
        onEntered={()=> {
          setInProp(false);
          selectCard(-1);
          setWeekList(birthdays);
        }}
      ><div/></CSSTransition>
      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-primary"
          onClick={next}
        >
          {'<'}
        </button>
        <button
          className="btn btn-primary"
          onClick={next}
        >
          {'>'}
        </button>
      </div>
      {renderCardsLists(0, 4)}
      {renderCardsLists(4)}
    </div>
  )
}

const mapStateToProps = ({birthdays}) => ({
  birthdays: birthdays.results,
  isLoaded: birthdays.isLoaded,
  isFetching: birthdays.isFetching,
});

export default connect(
  mapStateToProps,
  {fetchBirthdays}
)(Home);
