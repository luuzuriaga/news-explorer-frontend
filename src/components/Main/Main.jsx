import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import './Main.css';

function Main({
  onSearch,
  articles,
  isLoading,
  searchError,
  hasSearched,
  onShowMore,
  showMoreButton,
}) {
  return (
    <main className="main">
      <section className="main__hero">
        <div className="main__hero-content">
          <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
          <p className="main__subtitle">
            Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
            cuenta personal.
          </p>
          <SearchForm onSearch={onSearch} />
        </div>
      </section>

      {isLoading && <Preloader />}

      {searchError && (
        <section className="main__error">
          <div className="main__error-icon" />
          <h2 className="main__error-title">No se ha encontrado nada</h2>
          <p className="main__error-text">{searchError}</p>
        </section>
      )}

      {!isLoading && hasSearched && articles.length === 0 && !searchError && (
        <section className="main__not-found">
          <div className="main__not-found-icon" />
          <h2 className="main__not-found-title">No se ha encontrado nada</h2>
          <p className="main__not-found-text">
            Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.
          </p>
        </section>
      )}

      {!isLoading && articles.length > 0 && (
        <NewsCardList
          articles={articles}
          onShowMore={onShowMore}
          showMoreButton={showMoreButton}
        />
      )}

      <About />
    </main>
  );
}

export default Main;