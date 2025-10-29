import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ onLoginClick, onRegisterClick }) {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <header className={`header ${isMainPage ? 'header--main' : 'header--saved'}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
        <Navigation
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
        />
      </div>
    </header>
  );
}

export default Header;