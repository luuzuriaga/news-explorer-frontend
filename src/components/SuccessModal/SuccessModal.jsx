//SuccessModal.jsx
import { useEffect } from 'react';
import './SuccessModal.css';

function SuccessModal({ onClose, onSwitchToLogin }) {
  // Cerrar con ESC
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

  const handleLoginClick = () => {
    onClose();
    onSwitchToLogin();
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__container modal__container--success">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
        />
        <h2 className="modal__title modal__title--success">
          ¡El registro se ha completado con éxito!
        </h2>
        <button
          className="modal__link"
          type="button"
          onClick={handleLoginClick}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
