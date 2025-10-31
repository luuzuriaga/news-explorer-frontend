import { useState } from 'react';
import './NewsCard.css';

function NewsCard({ article, isSaved = false, onDelete, keyword }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isLoggedIn = false; // Cambiar según estado de autenticación

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const handleSaveClick = () => {
    if (isLoggedIn) {
      return;

    }if (isSaved && onDelete) {
      onDelete(article);
    } else {
      handleSaveToStorage();

    }

  };

  const handleSaveToStorage = () => {
    const saved = localStorage.getItem('savedArticles');
    const savedArticles = saved ? JSON.parse(saved) : [];
    const isAlreadySaved = savedArticles.some(
      (savedArticle) => savedArticle.url === article.url
    );

    if (!isAlreadySaved) {
      const articleWithKeyword = {...article, keyword: keyword || 'General'};
      savedArticles.push(articleWithKeyword);
      localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
      alert('Artículo guardado');
    }else {
      const filtered = savedArticles.filter(
        (savedArticle) => savedArticle.url !== article.url

      );

      localStorage.setItem('savedArticles', JSON.stringify(filtered));
      alert('Artículo eliminado de guardados');
    }

  };

  return (
    <li className="card">

      {isSaved && keyword && (
        <span className="card__keyword">{keyword}</span>
      )}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        <img
          src={article.urlToImage || '../../assets/images/placeholder-image.jpg'}
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
        className={`card__action-button ${
          isSaved ? 'card__action-button--delete' : 'card__action-button--save'
        } ${!isLoggedIn ? 'card__action-button--disabled' : ''}`}
        onClick={handleSaveClick}
        onMouseEnter={() => !isLoggedIn && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isSaved ? 'Eliminar de guardados' : 'Guardar artículo'}
      />
      {!isLoggedIn && showTooltip && (
        <div className="card__tooltip">
          Inicia sesión para guardar artículos
        </div>
      )}
      {isSaved && isLoggedIn && (
        <div className="card__tooltip card__tooltip--delete">
          Quitar de guardados
        </div>
        )}
    </li>
  );
}

export default NewsCard;
