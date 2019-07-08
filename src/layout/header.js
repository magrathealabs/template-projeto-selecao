import React from 'react';
import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-info">
    <nav className="navbar navbar-expand-lg navbar-light  contained w-100">
      <Link to="/" className="navbar-brand">Birthdays</Link>
      <Link to="/register" className="ml-3 btn btn-outline-light">New Birthday</Link>
    </nav>
  </header>
);

export default Header;
