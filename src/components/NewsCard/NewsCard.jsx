//NewsCard.jsx
import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './NewsCard.css';

function NewsCard({ article, isSaved = false, onToggleSave, keyword, showDelete = false }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const handleSaveClick = () => {
    if (!isLoggedIn) {
      setShowTooltip(true);
      return;
    }
    onToggleSave(article);
  };

  // Determinar qué clase usar
  const getButtonClass = () => {
    if (showDelete) {
      // En página de guardados, siempre mostrar botón de eliminar
      return 'card__action-button--delete';
    }
    // En página principal
    if (isSaved) {
      return 'card__action-button--saved'; // Azul cuando está guardado
    }
    return 'card__action-button--save'; // Normal cuando no está guardado
  };

  return (
    <li className="card">
      {keyword && (
        <span className="card__keyword">{keyword}</span>
      )}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        <img
          src={article.urlToImage || 'https://via.placeholder.com/400x272?text=Sin+imagen'}
          alt={article.title}
          className="card__image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x272?text=Sin+imagen';
          }}
        />
        <div className="card__content">
          <p className="card__date">{formatDate(article.publishedAt)}</p>
          <h3 className="card__title">{article.title}</h3>
          <p className="card__text">{article.description}</p>
          <p className="card__source">{article.source.name}</p>
        </div>
      </a>
      <button
        className={`card__action-button ${getButtonClass()} ${!isLoggedIn ? 'card__action-button--disabled' : ''}`}
        onClick={handleSaveClick}
        onMouseEnter={() => !isLoggedIn && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={showDelete ? 'Eliminar de guardados' : isSaved ? 'Quitar guardado' : 'Guardar artículo'}
      />
      {!isLoggedIn && showTooltip && (
        <div className="card__tooltip">
          Inicia sesión para guardar artículos
        </div>
      )}
    </li>
  );
}

export default NewsCard;
