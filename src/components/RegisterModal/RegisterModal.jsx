//RegisterModal.jsx
import { useState, useEffect } from 'react';
import './RegisterModal.css';

function RegisterModal({ onClose, onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Validación en tiempo real
  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};

      // Validar email
      if (!email) {
        newErrors.email = 'Campo requerido';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Correo electrónico no válido';
      }

      // Validar contraseña
      if (!password) {
        newErrors.password = 'Campo requerido';
      } else if (password.length < 6) {
        newErrors.password = 'Mínimo 6 caracteres';
      }

      // Validar nombre
      if (!name) {
        newErrors.name = 'Campo requerido';
      } else if (name.length < 2) {
        newErrors.name = 'Mínimo 2 caracteres';
      }

      setErrors(newErrors);
      setIsValid(Object.keys(newErrors).length === 0 && email && password && name);
    };

    validateForm();
  }, [email, password, name]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister(email, password, name);
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
        <h2 className="modal__title">Inscribirse</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Correo electrónico
            <input
              type="email"
              className={`modal__input ${errors.email ? 'modal__input--error' : ''}`}
              placeholder="Introduce tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="modal__error">{errors.email}</span>
            )}
          </label>

          <label className="modal__label">
            Contraseña
            <input
              type="password"
              className={`modal__input ${errors.password ? 'modal__input--error' : ''}`}
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="modal__error">{errors.password}</span>
            )}
          </label>

          <label className="modal__label">
            Nombre de usuario
            <input
              type="text"
              className={`modal__input ${errors.name ? 'modal__input--error' : ''}`}
              placeholder="Introduce tu nombre de usuario"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <span className="modal__error">{errors.name}</span>
            )}
          </label>

          <button
            type="submit"
            className={`modal__button ${!isValid ? 'modal__button--disabled' : ''}`}
            disabled={!isValid}
          >
            Inscribirse
          </button>
        </form>
        <button
          className="modal__switch"
          type="button"
          onClick={onSwitchToLogin}
        >
          o <span className="modal__switch-link">Iniciar sesión</span>
        </button>
      </div>
    </div>
  );
}

export default RegisterModal;
