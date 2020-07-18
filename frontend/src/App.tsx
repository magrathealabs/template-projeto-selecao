import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './hooks/index';
import Routes from './routes';

import './App.scss';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes />
      </Router>
    </AppProvider>
  );
};

export default App;
