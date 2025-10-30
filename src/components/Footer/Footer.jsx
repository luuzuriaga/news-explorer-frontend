import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2025 Powered by Lucero Uzuriaga
        </p>
        <nav className="footer__nav">
          <ul className="footer__links">
            <li className="footer__link-item">
              <Link to="/" className="footer__link">
                Inicio
              </Link>
            </li>
            <li className="footer__link-item">
              <a
                href="https://practicum.com"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Practicum
              </a>
            </li>
          </ul>
          <ul className="footer__social">
            <li className="footer__social-item">
              <a
                href="https://github.com"
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <img
                  src="../../../images/github.png"
                  alt="GitHub"
                  className="footer__social-icon"
                />
              </a>
            </li>
            <li className="footer__social-item">
              <a
                href="https://facebook.com"
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <img
                  src="../../../images/fb.png"
                  alt="Facebook"
                  className="footer__social-icon"
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
