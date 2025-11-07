//Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import menuIcon from '../../assets/images/menu.svg';
import './Header.css';

function Header({ onLoginClick, onLogout }) {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isMainPage ? 'header--main' : 'header--saved'}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>

        <button
          className={`header__menu-button ${isMenuOpen ? 'header__menu-button--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú"
        >
          {isMenuOpen ? (
            <svg
              className="header__menu-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <img
              src={menuIcon}
              alt="Menú"
              className="header__menu-icon"
            />
          )}
        </button>

        <Navigation
          onLoginClick={onLoginClick}
          onLogout={onLogout}
          isMenuOpen={isMenuOpen}
          onCloseMenu={closeMenu}
        />
      </div>
    </header>
  );
}

export default Header;
