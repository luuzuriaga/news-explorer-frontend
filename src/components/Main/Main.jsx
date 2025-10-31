import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import './Main.css';

const MOCK_ARTICLES = [
  {
    source: { name: 'TechCrunch' },
    title: 'Nuevos avances en inteligencia artificial transforman la industria',
    description: 'Las últimas innovaciones en IA están revolucionando diversos sectores, desde la salud hasta la educación.',
    url: 'https://techcrunch.com',
    urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    publishedAt: '2025-01-15T10:30:00Z'
  },
  {
    source: { name: 'The Verge' },
    title: 'Apple anuncia nuevo MacBook Pro con chip revolucionario',
    description: 'La compañía de Cupertino presenta su última creación con mejoras significativas en rendimiento y eficiencia energética.',
    url: 'https://theverge.com',
    urlToImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    publishedAt: '2025-01-14T15:45:00Z'
  },
  {
    source: { name: 'Wired' },
    title: 'El futuro del trabajo remoto: tendencias para 2025',
    description: 'Expertos analizan cómo evolucionará el teletrabajo y qué herramientas dominarán el mercado.',
    url: 'https://wired.com',
    urlToImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800',
    publishedAt: '2025-01-13T09:20:00Z'
  },
  {
    source: { name: 'BBC News' },
    title: 'Cambio climático: nuevas medidas adoptadas en cumbre mundial',
    description: 'Líderes mundiales se comprometen a reducir emisiones en un 50% para el año 2030.',
    url: 'https://bbc.com',
    urlToImage: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b2?w=800',
    publishedAt: '2025-01-12T14:00:00Z'
  },
  {
    source: { name: 'National Geographic' },
    title: 'Descubren nueva especie marina en las profundidades del océano',
    description: 'Científicos encuentran criaturas nunca antes vistas a más de 3000 metros de profundidad.',
    url: 'https://nationalgeographic.com',
    urlToImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    publishedAt: '2025-01-11T11:30:00Z'
  },
  {
    source: { name: 'ESPN' },
    title: 'Mundial de fútbol 2026: todo lo que necesitas saber',
    description: 'Preparativos, sedes confirmadas y favoritos para el próximo torneo internacional.',
    url: 'https://espn.com',
    urlToImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
    publishedAt: '2025-01-10T16:15:00Z'
  }
];



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
