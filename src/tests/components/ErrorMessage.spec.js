import React from 'react';
import { shallow } from 'enzyme';
import context from 'jest-plugin-context';

import ErrorMessage from '../../components/ErrorMessage';

describe('<ErrorMessage />', () => {
  context('When it has an error prop', () => {
    it('renders with the passed error', () => {
      const error = 'An error message for testing purposes!';
      const wrapper = shallow(<ErrorMessage error={error} />);
      expect(wrapper.isEmptyRender()).toBe(false);
      expect(wrapper.find('.error__message').text()).toBe(error);
    });
  });

  context('When it does not have an error prop', () => {
    it('does not render anything', () => {
      expect(shallow(<ErrorMessage />).isEmptyRender()).toBe(true);
    });
  });
});
