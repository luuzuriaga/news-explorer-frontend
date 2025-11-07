//utils/NewsApi.js
const API_KEY = '248a4a978cfd47d496344bc4c21b49f0'; // Reemplazar con tu API key
//const BASE_URL = 'https://nomoreparties.co/news/v2'; // Usar proxy de TripleTen para producción
const BASE_URL = 'https://newsapi.org/v2'; // Para desarrollo local

export const searchNews = (keyword) => {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const from = formatDate(weekAgo);
  const to = formatDate(today);

  return fetch(
    `${BASE_URL}/everything?q=${keyword}&from=${from}&to=${to}&pageSize=100&apiKey=${API_KEY}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error('Error al buscar noticias:', err);
      throw err;
    });
};
