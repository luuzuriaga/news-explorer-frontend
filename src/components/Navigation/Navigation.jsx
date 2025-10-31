import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ onLoginClick, isMenuOpen, onCloseMenu }) {
  const isLoggedIn = false; // ← Cambiar según estado de autenticación

  const handleLinkClick = () => {
    if (onCloseMenu) {
      onCloseMenu();
    }
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
            <button className="navigation__button navigation__button--logout">
              Elise
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
