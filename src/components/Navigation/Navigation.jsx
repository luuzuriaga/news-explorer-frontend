import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ onLoginClick }) {
  const isLoggedIn = false; // Cambiar según estado de autenticación

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''}`
            }
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
              onClick={onLoginClick}
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