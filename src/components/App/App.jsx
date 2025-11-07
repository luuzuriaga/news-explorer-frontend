//App.jsx
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
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState('');

  // Estados de modales
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Cargar datos de localStorage al montar
  useEffect(() => {
    const savedArticlesData = localStorage.getItem('articles');
    if (savedArticlesData) {
      setArticles(JSON.parse(savedArticlesData));
      setHasSearched(true);
    }

    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }

    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  }, []);

  // Guardar artículos en localStorage
  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  }, [articles]);

  // Guardar artículos guardados en localStorage
  useEffect(() => {
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
  }, [savedArticles]);

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
    setCurrentKeyword(keyword);

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
    // Simulación de login exitoso
    const user = {
      email: email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
    };
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    handleCloseLoginModal();
  };

  // Manejar registro
  const handleRegister = (email, password, name) => {
    console.log('Register:', email, password, name);
    handleCloseRegisterModal();
    handleOpenSuccessModal();
  };

  // Manejar logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Manejar guardar/eliminar artículo
  const handleToggleSave = (article) => {
    if (!currentUser) {
      handleOpenLoginModal();
      return;
    }

    const isAlreadySaved = savedArticles.some(
      (saved) => saved.url === article.url
    );

    if (isAlreadySaved) {
      const filtered = savedArticles.filter(
        (saved) => saved.url !== article.url
      );
      setSavedArticles(filtered);
    } else {
      const articleWithKeyword = {
        ...article,
        keyword: currentKeyword || 'General'
      };
      setSavedArticles([...savedArticles, articleWithKeyword]);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          onLoginClick={handleOpenLoginModal}
          onLogout={handleLogout}
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
                savedArticles={savedArticles}
                onToggleSave={handleToggleSave}
                currentKeyword={currentKeyword}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews
                savedArticles={savedArticles}
                onToggleSave={handleToggleSave}
              />
            }
          />
        </Routes>

        <Footer />

        {isLoginModalOpen && (
          <LoginModal
            onClose={handleCloseLoginModal}
            onLogin={handleLogin}
            onSwitchToRegister={handleOpenRegisterModal}
          />
        )}

        {isRegisterModalOpen && (
          <RegisterModal
            onClose={handleCloseRegisterModal}
            onRegister={handleRegister}
            onSwitchToLogin={handleOpenLoginModal}
          />
        )}

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
