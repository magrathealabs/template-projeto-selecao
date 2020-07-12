import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const ErrorMessage = ({
  error,
}) => {
  return !!error && (
    <div className="error" >
      <div className="error__arrow"/>
      <div className="error__message">
        {error}
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

export default ErrorMessage;
