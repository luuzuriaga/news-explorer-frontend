import { useState, useEffect } from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCard from '../NewsCard/NewsCard';
import './SavedNews.css';

function SavedNews() {
  const [savedArticles, setSavedArticles] = useState([]);
  const userName = 'Elise'; // Luego vendrá del contexto de usuario

  // Cargar artículos guardados del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  }, []);

  // Función para eliminar artículo
  const handleDeleteArticle = (articleToDelete) => {
    const updatedArticles = savedArticles.filter(
      (article) => article.url !== articleToDelete.url
    );
    setSavedArticles(updatedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
  };

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
                  onDelete={handleDeleteArticle}
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
