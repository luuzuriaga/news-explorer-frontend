//SearchForm.jsx
import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!keyword.trim()) {
      setError('Por favor, introduzca una palabra clave');
      return;
    }

    setError('');
    onSearch(keyword);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__container">
        <input
          type="text"
          className={`search__input ${error ? 'search__input--error' : ''}`}
          placeholder="Introduce un tema"
          value={keyword}
          onChange={handleChange}
        />
        <button type="submit" className="search__button">
          Buscar
        </button>
      </div>
      {error && <span className="search__error">{error}</span>}
    </form>
  );
}

export default SearchForm;
