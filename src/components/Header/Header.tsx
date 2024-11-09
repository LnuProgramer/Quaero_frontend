import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Quaero</h1>
        <p>vacancies for you</p>
      </div>
      <nav className="nav">
        <a href="#" className="nav-link">Увійти</a>
        <a href="#" className="nav-link">Зареєструватись</a>
      </nav>
    </header>
  );
};

export default Header;
