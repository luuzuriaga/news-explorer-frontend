import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__circle"></span>
        <p className="preloader__text">Buscando noticias...</p>
      </div>
    </div>
  );
}

export default Preloader;