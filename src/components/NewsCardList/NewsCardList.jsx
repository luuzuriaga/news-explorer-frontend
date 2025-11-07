//NewsCardList.jsx
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({
  articles,
  onShowMore,
  showMoreButton,
  savedArticles = [],
  onToggleSave,
  currentKeyword
}) {
  // Función para verificar si un artículo está guardado
  const isArticleSaved = (article) => {
    return savedArticles.some((saved) => saved.url === article.url);
  };

  return (
    <section className="news">
      <div className="news__container">
        <h2 className="news__title">Resultados de la búsqueda</h2>
        <ul className="news__list">
          {articles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              isSaved={isArticleSaved(article)}
              onToggleSave={onToggleSave}
              keyword={currentKeyword}
            />
          ))}
        </ul>
        {showMoreButton && (
          <button className="news__button" onClick={onShowMore}>
            Ver más
          </button>
        )}
      </div>
    </section>
  );
}

export default NewsCardList;
