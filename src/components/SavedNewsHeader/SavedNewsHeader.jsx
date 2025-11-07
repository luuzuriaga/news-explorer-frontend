//SavedNewsHeader.jsx
import './SavedNewsHeader.css';

function SavedNewsHeader({ userName, articlesCount, articles }) {
  const getTopKeywords = () => {
    if (!articles || articles.length === 0) return '';

    // Contar keywords
    const keywordCount = {};
    articles.forEach(article => {
      const keyword = article.keyword || 'Sin categoría';
      keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
    });

    // Ordenar por frecuencia
    const sortedKeywords = Object.entries(keywordCount)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    if (sortedKeywords.length === 0) {
      return 'Sin palabras clave';
    }

    if (sortedKeywords.length <= 3) {
      return sortedKeywords.join(', ');
    }

    const firstTwo = sortedKeywords.slice(0, 2).join(', ');
    const remaining = sortedKeywords.length - 2;
    return `${firstTwo} y ${remaining} más`;
  };

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__subtitle">Artículos guardados</p>
        <h1 className="saved-news-header__title">
          {userName}, tienes {articlesCount} artículo{articlesCount !== 1 ? 's' : ''}{' '}
          guardado{articlesCount !== 1 ? 's' : ''}
        </h1>
        {articlesCount > 0 && (
          <p className="saved-news-header__keywords">
            Por palabras clave:{' '}
            <span className="saved-news-header__keywords-bold">
              {getTopKeywords()}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}

export default SavedNewsHeader;
