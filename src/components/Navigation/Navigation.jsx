import { NavLink } from 'react-router-dom';
import './Navigation.css';

// ← AGREGAR isMenuOpen y onCloseMenu en los parámetros
function Navigation({ onLoginClick, isMenuOpen, onCloseMenu }) {
  const isLoggedIn = false;

  // ← AGREGAR esta función para cerrar menú al hacer click en un link
  const handleLinkClick = () => {
    if (onCloseMenu) {
      onCloseMenu();
    }
  };

  return (
    // ← AGREGAR clase condicional
    <nav className={`navigation ${isMenuOpen ? 'navigation--open' : ''}`}>
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''}`
            }
            onClick={handleLinkClick} // ← AGREGAR
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
              onClick={handleLinkClick} // ← AGREGAR
            >
              Artículos guardados
            </NavLink>
          </li>
        )}
        <li className="navigation__item">
          {isLoggedIn ? (
            <button className="navigation__button navigation__button--logout">
              Cerrar sesión
            </button>
          ) : (
            <button
              className="navigation__button navigation__button--login"
              onClick={() => {
                onLoginClick();
                handleLinkClick(); // ← AGREGAR para cerrar menú al abrir modal
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
