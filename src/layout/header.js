import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => (
  <header className="header__background">
    <nav className="header contained">
      <Link to="/" className="header__logo">Birthdays</Link>
      <Link to="/register" className="header__button">New Birthday</Link>
    </nav>
  </header>
);

export default Header;
