//ModalWithForm.jsx
import { useEffect } from 'react';
import './ModalWithForm.css';

function ModalWithForm({ title, buttonText, children, onClose, onSubmit }) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__container">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
        />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          {children}
          <button type="submit" className="modal__button">
            {buttonText}
          </button>
        </form>
        <button className="modal__switch" type="button">
          o <span className="modal__switch-link">Registrarse</span>
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
