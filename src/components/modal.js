import React, {Fragment} from 'react';
import './modal.scss';

export default ({
  handleClose,
  show,
  children,
}) => show && (
  <Fragment>
    <div onClick={handleClose} className="modal__background"/>
    <div className="modal">
      <button onClick={handleClose} className="modal__button">
        X
      </button>
      {children}
    </div>
  </Fragment>
);
