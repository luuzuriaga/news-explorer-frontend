import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { searchNews } from '../../utils/NewsApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';

function App() {
  // Estados principales
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Estados de modales
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Cargar datos de localStorage al montar
  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
      setHasSearched(true);
    }
  }, []);

  // Guardar artículos en localStorage
  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  }, [articles]);

  // Función de búsqueda
  const handleSearch = (keyword) => {
    if (!keyword.trim()) {
      setSearchError('Por favor, introduzca una palabra clave');
      return;
    }

    setIsLoading(true);
    setSearchError('');
    setHasSearched(true);
    setVisibleArticles(3);

    searchNews(keyword)
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      })
      .catch(() => {
        setSearchError(
          'Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Mostrar más artículos
  const handleShowMore = () => {
    setVisibleArticles((prev) => prev + 3);
  };

  // Modales
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          onLoginClick={handleOpenLoginModal}
          onRegisterClick={handleOpenRegisterModal}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                onSearch={handleSearch}
                articles={articles.slice(0, visibleArticles)}
                isLoading={isLoading}
                searchError={searchError}
                hasSearched={hasSearched}
                onShowMore={handleShowMore}
                showMoreButton={visibleArticles < articles.length}
              />
            }
          />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>

        <Footer />

        {isLoginModalOpen && (
          <ModalWithForm
            title="Iniciar sesión"
            buttonText="Iniciar sesión"
            onClose={handleCloseLoginModal}
          >
            <label className="modal__label">
              Correo electrónico
              <input
                type="email"
                className="modal__input"
                placeholder="Introduce tu correo"
                required
              />
            </label>
            <label className="modal__label">
              Contraseña
              <input
                type="password"
                className="modal__input"
                placeholder="Introduce tu contraseña"
                required
              />
            </label>
          </ModalWithForm>
        )}

        {isRegisterModalOpen && (
          <ModalWithForm
            title="Registrarse"
            buttonText="Registrarse"
            onClose={handleCloseRegisterModal}
          >
            <label className="modal__label">
              Correo electrónico
              <input
                type="email"
                className="modal__input"
                placeholder="Introduce tu correo"
                required
              />
            </label>
            <label className="modal__label">
              Contraseña
              <input
                type="password"
                className="modal__input"
                placeholder="Introduce tu contraseña"
                required
              />
            </label>
            <label className="modal__label">
              Nombre de usuario
              <input
                type="text"
                className="modal__input"
                placeholder="Introduce tu nombre"
                required
              />
            </label>
          </ModalWithForm>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
