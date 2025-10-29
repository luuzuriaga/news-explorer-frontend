import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from "../NewsCardList/NewsCardList";
import './SavedNews.css';

function SavedNews() {
  const savedArticles = []; // Aquí irán los artículos guardados del backend
  const userName = 'Elise'; // Nombre del usuario autenticado

  return (
    <main className="saved-news">
      <SavedNewsHeader
        userName={userName}
        articlesCount={savedArticles.length}
        articles={savedArticles}
      />
      {savedArticles.length > 0 ? (
        <NewsCardList
          articles={savedArticles}
          showMoreButton={false}
          isSavedNews={true}
        />
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
