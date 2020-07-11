import React from 'react';
import './style.scss';

export default ({
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
