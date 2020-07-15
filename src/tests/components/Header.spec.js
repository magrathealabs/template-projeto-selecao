import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';

import Header from '../../components/Header';

describe('<Header />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <Header />
      </Router>
    , div);
  });

  it('renders the header logo', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('.header__logo').text()).toBe('Birthdays');
    expect(wrapper.find('.header__logo').prop('to')).toBe('/');
  });

  it('renders the register link', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('.header__button').text()).toBe('New Birthday');
    expect(wrapper.find('.header__button').prop('to')).toBe('/register');
  });
});
