import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';

import './styles.scss';

const Load: React.FC = () => {
  return (
    <div className="load">
      <h2>wait, loading data...</h2>
      <div>
        <FiRefreshCw size={100} />
      </div>
    </div>
  );
};

export default Load;
