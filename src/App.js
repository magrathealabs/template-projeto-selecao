import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from './layout/header';
import Home from './views/Home';
import Register from './views/Register';
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="min-vh-100">
        <Header />

        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
      </div>
    </Router>
  );
}

export default App;
