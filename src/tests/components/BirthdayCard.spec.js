import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { shallow } from 'enzyme';
import context from 'jest-plugin-context';

import BirthdayCard from '../../components/BirthdayCard';

describe('<BirthdayCard />', () => {
  context('When it has all the required props', () => {
    it('renders without crashing', () => {
      const props = {
        handleClick: jest.fn(),
        cardSelected: false,
        date: moment(),
        birthdays: [],
      };
      const div = document.createElement('div');
      ReactDOM.render(<BirthdayCard {...props} />, div);
    });

    it('renders the passed date', () => {
      const props = {
        handleClick: jest.fn(),
        cardSelected: false,
        date: moment(),
        birthdays: [],
      };

      const wrapper = shallow(<BirthdayCard {...props} />);
      wrapper.find('.birthday-card').simulate('click');
      expect(props.handleClick.mock.calls.length).toBe(1);
    });

    context('When cardSelected is true', () => {
      it('renders with the birthday-card--selected class modier', () => {
        const props = {
          handleClick: jest.fn(),
          cardSelected: true,
          date: moment(),
          birthdays: [],
        };

        const wrapper = shallow(<BirthdayCard {...props} />);
        expect(wrapper.find('.birthday-card').hasClass('birthday-card--selected')).toBe(true);
      });
    });

    context('When bithdays is not empty', () => {
      it('renders the list of birthdays', () => {
        const props = {
          handleClick: jest.fn(),
          cardSelected: false,
          date: moment(),
          birthdays: ['Name 1', 'Name 2'],
        };

        const wrapper = shallow(<BirthdayCard {...props} />);
        expect(wrapper.find('.birthday-card__name').getElements().length).toBe(props.birthdays.length);
        expect(wrapper.find('.birthday-card__name').at(0).text()).toBe(props.birthdays[0]);
        expect(wrapper.find('.birthday-card__name').at(1).text()).toBe(props.birthdays[1]);
      });
    });

    context('When birthdays is empty', () => {
      it('renders a \'Not Bitrthdays today\' message', () => {
        const props = {
          handleClick: jest.fn(),
          cardSelected: false,
          date: moment(),
          birthdays: [],
        };

        const wrapper = shallow(<BirthdayCard {...props} />);
        expect(wrapper.find('li').getElements().length).toBe(1);
        expect(wrapper.find('li').text()).toBe('No Birthdays today :(');
      });
    });

    context('When the card is clicked', () => {
      it('executes the handleClick prop', () => {
        const props = {
          handleClick: jest.fn(),
          cardSelected: false,
          date: moment(),
          birthdays: [],
        };

        const wrapper = shallow(<BirthdayCard {...props} />);
        expect(wrapper.find('.birthday-card__date').getElements().length).toBe(2);
        expect(wrapper.find('.birthday-card__date').at(0).text()).toBe(props.date.format('dddd'));
        expect(wrapper.find('.birthday-card__date').at(1).text()).toBe(props.date.format('DD/MMM'));
      });
    })
  });

  context('When it has the error prop', () => {
    it('renders the error message', () => {
      const props = {
        handleClick: jest.fn(),
        cardSelected: false,
        error: 'Error message for testing purposes',
      };

      const wrapper = shallow(<BirthdayCard {...props} />);
      expect(wrapper.find('.birthday-card__error').getElements().length).toBe(2);
      expect(wrapper.find('.birthday-card__error').at(0).text()).toBe('The following error occurred:');
      expect(wrapper.find('.birthday-card__error').at(1).text()).toBe(props.error);
    });
    it('renders with the birthday-card--error class modier', () => {
      const props = {
        handleClick: jest.fn(),
        cardSelected: false,
        error: 'Error message for testing purposes',
      };

      const wrapper = shallow(<BirthdayCard {...props} />);
      expect(wrapper.find('.birthday-card').hasClass('birthday-card--error')).toBe(true);
    });
  });
});
