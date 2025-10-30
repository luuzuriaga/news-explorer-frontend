import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import menuIcon from '../../assets/images/menu.svg'; // ← AGREGAR ESTA LÍNEA
import './Header.css';

function Header({ onLoginClick, onRegisterClick }) {
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

        {/* ← BOTÓN CON TU SVG */}
        <button
          className={`header__menu-button ${isMenuOpen ? 'header__menu-button--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú"
        >
          {isMenuOpen ? (
            // Icono X cuando está abierto
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
            // Tu icono menu.svg cuando está cerrado
            <img
              src={menuIcon}
              alt="Menú"
              className="header__menu-icon"
            />
          )}
        </button>

        <Navigation
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
          isMenuOpen={isMenuOpen}
          onCloseMenu={closeMenu}
        />
      </div>
    </header>
  );
}

export default Header;
