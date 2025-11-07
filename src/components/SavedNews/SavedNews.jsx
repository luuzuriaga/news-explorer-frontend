//SavedNews.jsx
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCard from '../NewsCard/NewsCard';
import './SavedNews.css';

function SavedNews({ savedArticles, onToggleSave }) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser?.name || 'Usuario';

  return (
    <main className="saved-news">
      <SavedNewsHeader
        userName={userName}
        articlesCount={savedArticles.length}
        articles={savedArticles}
      />

      {savedArticles.length > 0 ? (
        <section className="saved-news__cards">
          <div className="saved-news__container">
            <ul className="saved-news__list">
              {savedArticles.map((article, index) => (
                <NewsCard
                  key={index}
                  article={article}
                  isSaved={true}
                  onToggleSave={onToggleSave}
                  keyword={article.keyword}
                />
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="saved-news__empty">
          <p className="saved-news__empty-text">
            Aún no has guardado ningún artículo
          </p>
        </section>
      )}
    </main>
  );
}

export default SavedNews;
