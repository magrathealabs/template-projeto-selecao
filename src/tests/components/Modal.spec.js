import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import context from 'jest-plugin-context';

import Modal from '../../components/Modal';

describe('<Modal />', () => {
  context('When it has all the required props', () => {
    it('renders without crashing', () => {
      const props = {
        handleClose: jest.fn(),
        show: true,
      };

      const div = document.createElement('div');
      ReactDOM.render(<Modal {...props}><div/></Modal> , div);
    });

    context('When the background is clicked', () => {
      it('executes the handleClose function', () => {
        const props = {
          handleClose: jest.fn(),
          show: true,
        };

        const wrapper = shallow(<Modal {...props}><div/></Modal>);
        wrapper.find('.modal__background').simulate('click');
        expect(props.handleClose.mock.calls.length).toBe(1);
      });
    });

    context('When the close button is clicked', () => {
      it('executes the handleClose function', () => {
        const props = {
          handleClose: jest.fn(),
          show: true,
        };

        const wrapper = shallow(<Modal {...props}><div/></Modal>);
        wrapper.find('.modal__button').simulate('click');
        expect(props.handleClose.mock.calls.length).toBe(1);
      });
    });

    context('When the show prop is false', () => {
      it('does not render anything', () => {
        const props = {
          handleClose: jest.fn(),
          show: false,
        };

        expect(shallow(<Modal {...props}><div/></Modal>).isEmptyRender()).toBe(true);
      });
    });
  });
});
