import React from 'react';
import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-primary">
    <nav className="navbar navbar-expand-lg navbar-light  contained w-100">
      <Link to="/" className="navbar-brand">Birthdays</Link>
    </nav>
  </header>
);

export default Header;
