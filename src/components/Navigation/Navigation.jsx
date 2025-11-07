//Navigation.jsx
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Navigation.css';

function Navigation({ onLoginClick, onLogout, isMenuOpen, onCloseMenu }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

  const handleLinkClick = () => {
    if (onCloseMenu) {
      onCloseMenu();
    }
  };

  const handleLogout = () => {
    onLogout();
    handleLinkClick();
  };

  return (
    <nav className={`navigation ${isMenuOpen ? 'navigation--open' : ''}`}>
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''}`
            }
            onClick={handleLinkClick}
          >
            Inicio
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className="navigation__item">
            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `navigation__link ${isActive ? 'navigation__link--active' : ''}`
              }
              onClick={handleLinkClick}
            >
              Artículos guardados
            </NavLink>
          </li>
        )}
        <li className="navigation__item">
          {isLoggedIn ? (
            <button
              className="navigation__button navigation__button--logout"
              onClick={handleLogout}
            >
              {currentUser.name}
              <span className="navigation__button-icon"></span>
            </button>
          ) : (
            <button
              className="navigation__button navigation__button--login"
              onClick={() => {
                onLoginClick();
                handleLinkClick();
              }}
            >
              Iniciar sesión
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
