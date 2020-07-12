import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Modal = ({
  handleClose,
  show,
  children,
}) => show && (
  <>
    <div onClick={handleClose} className="modal__background"/>
    <div className="modal">
      <button onClick={handleClose} className="modal__button">
        X
      </button>
      {children}
    </div>
  </>
);

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
