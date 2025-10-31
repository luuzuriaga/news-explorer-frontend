import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import SuccessModal from '../SuccessModal/SuccessModal';
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
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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

  // Funciones de modales
  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
    setIsSuccessModalOpen(false);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
    setIsSuccessModalOpen(false);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleOpenSuccessModal = () => {
    setIsSuccessModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  // Manejar login
  const handleLogin = (email, password) => {
    console.log('Login:', email, password);
    // Aquí irá la lógica de autenticación
    handleCloseLoginModal();
  };

  // Manejar registro
  const handleRegister = (email, password, name) => {
    console.log('Register:', email, password, name);
    // Aquí irá la lógica de registro
    handleCloseRegisterModal();
    handleOpenSuccessModal();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          onLoginClick={handleOpenLoginModal}
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

        {/* Modal de Inicio de Sesión */}
        {isLoginModalOpen && (
          <LoginModal
            onClose={handleCloseLoginModal}
            onLogin={handleLogin}
            onSwitchToRegister={handleOpenRegisterModal}
          />
        )}

        {/* Modal de Registro */}
        {isRegisterModalOpen && (
          <RegisterModal
            onClose={handleCloseRegisterModal}
            onRegister={handleRegister}
            onSwitchToLogin={handleOpenLoginModal}
          />
        )}

        {/* Modal de Éxito */}
        {isSuccessModalOpen && (
          <SuccessModal
            onClose={handleCloseSuccessModal}
            onSwitchToLogin={handleOpenLoginModal}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
