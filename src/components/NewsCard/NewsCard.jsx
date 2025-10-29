import { useState } from 'react';
import './NewsCard.css';

function NewsCard({ article }) {
  const [isSaved, setIsSaved] = useState(false);
  const isLoggedIn = false; // Cambiar según estado de autenticación

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const handleSaveClick = () => {
    if (isLoggedIn) {
      setIsSaved(!isSaved);
      // Aquí irá la lógica para guardar/eliminar del backend
    }
  };

  return (
    <li className="card">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        <img
          src={article.urlToImage || '/placeholder-image.jpg'}
          alt={article.title}
          className="card__image"
        />
        <div className="card__content">
          <p className="card__date">{formatDate(article.publishedAt)}</p>
          <h3 className="card__title">{article.title}</h3>
          <p className="card__text">{article.description}</p>
          <p className="card__source">{article.source.name}</p>
        </div>
      </a>
      <button
        className={`card__save-button ${
          isSaved ? 'card__save-button--active' : ''
        } ${!isLoggedIn ? 'card__save-button--disabled' : ''}`}
        onClick={handleSaveClick}
        aria-label={isSaved ? 'Eliminar de guardados' : 'Guardar artículo'}
      />
      {!isLoggedIn && (
        <div className="card__tooltip">
          Inicia sesión para guardar artículos
        </div>
      )}
    </li>
  );
}

export default NewsCard;