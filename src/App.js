import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';
import Home from './views/Home';
import Register from './views/Register';
import SharedBirthdays from './views/SharedBirthdays';
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />

        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/shared" exact component={SharedBirthdays} />
      </div>
    </Router>
  );
}

export default App;
