import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import context from 'jest-plugin-context';

import Calendar from '../../components/Calendar';

describe('<Calendar />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Calendar />, div);
  });

  context('When it does not have an error prop', () => {
    it('renders without the error modifier', () => {
    const wrapper = shallow(<Calendar />);
      expect(wrapper.find('.calendar').hasClass('calendar--error')).toBe(false);
    });
  });

  context('When it has an error prop', () => {
    it('renders without the error modifier', () => {
      const wrapper = shallow(<Calendar error />);
      expect(wrapper.find('.calendar').hasClass('calendar--error')).toBe(true);
    });
  });
});
