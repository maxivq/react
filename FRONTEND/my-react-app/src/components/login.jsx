import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css';

const Login = ({ setLoggedIn, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contraseña }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ email })); // Guardar información del usuario
      setLoggedIn(true);

      if (email === 'admin@example.com') {
        setIsAdmin(true);
      }

      navigate('/'); // Redirigir al inicio después de iniciar sesión
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth-form-input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="auth-form-input"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <button type="submit" className="auth-form-submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
