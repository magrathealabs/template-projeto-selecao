import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './birthday-card.scss';
import './flip.scss';

export default () => {
  const [inProp, setInProp] = useState(false);
  const [week, setWeek] = useState(week1);
  const [nextWeek, setNextWeek] = useState(week2);

  const renderCardsLists = (start, end) => (
    <div className="birthday-card__list my-lg-2">
      {week.slice(start, end).map((day, index) => (
        <CSSTransition
          in={inProp}
          timeout={400}
          classNames="flip"
          key={index + start}
        >
          <div className="birthday-card bg-warning m-2 my-lg-0">
            <span className="birthday-card__date">
              {day.weekday}
            </span>
            <span className="birthday-card__date mb-3">
              {day.day}
            </span>
            <ul>
              {day.birthdays.length
                ? day.birthdays.map((birthday, birthdayIndex) => <li key={birthdayIndex} className="birthday-card__name mb-1">{birthday}</li>)
                : <li>No Birthdays today :(</li>
              }
            </ul>
          </div>
        </CSSTransition>
      ))}
    </div>
  )

  return (
    <div className="d-flex flex-column p-2">
      <h3>Incoming Birthdays</h3>
      <CSSTransition
        in={inProp}
        timeout={400}
        onEntered={()=> {
          setInProp(false);
          setWeek(nextWeek);
          setNextWeek(week1);
        }}
      ><div/></CSSTransition>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={() => setInProp(true)}
        >
          {'<'}
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setInProp(true)}
        >
          {'>'}
        </button>
      </div>
      {renderCardsLists(0, 4)}
      {renderCardsLists(4)}
    </div>
  )
}

const week2 = [
  {
    day: '08/01',
    weekday: 'sunday',
    birthdays: []
  },
  {
    day: '09/01',
    weekday: 'monday',
    birthdays: [
      'Leonardo',
      'Leonardo',
      'Leonardo',
    ]
  },
  {
    day: '10/01',
    weekday: 'tuesday',
    birthdays: [
      'Leonardo',
    ]
  },
  {
    day: '11/01',
    weekday: 'wednessday',
    birthdays: [
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
    ]
  },
  {
    day: '12/01',
    weekday: 'thursday',
    birthdays: [
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
    ]
  },
  {
    day: '13/01',
    weekday: 'friday',
    birthdays: [
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
    ]
  },
  {
    day: '14/01',
    weekday: 'saturday',
    birthdays: [
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
    ]
  },
];

const week1 = [
  {
    day: '01/01',
    weekday: 'sunday',
    birthdays: [
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
    ]
  },
  {
    day: '02/01',
    weekday: 'monday',
    birthdays: [
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
    ]
  },
  {
    day: '03/01',
    weekday: 'tuesday',
    birthdays: [
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
    ]
  },
  {
    day: '04/01',
    weekday: 'wednessday',
    birthdays: [
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
    ]
  },
  {
    day: '05/01',
    weekday: 'thursday',
    birthdays: [
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
    ]
  },
  {
    day: '06/01',
    weekday: 'friday',
    birthdays: [
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
    ]
  },
  {
    day: '07/01',
    weekday: 'saturday',
    birthdays: [
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
      'Leonardo',
    ]
  },
]
