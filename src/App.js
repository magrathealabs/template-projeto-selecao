import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './views/Home'
import Header from './layout/header';
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="min-vh-100">
        <Header />

        <Route path="/" exact component={Home} />
      </div>
    </Router>
  );
}

export default App;
