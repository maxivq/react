import React, { useState } from 'react';
import '../styles/AuthForms.css';

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');

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
      setLoggedIn(true); // Actualizar el estado de loggedIn a true
      console.log('Inicio de sesión exitoso:', data);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
    setLoggedIn(true);
    localStorage.setItem('token', 'yourAuthToken'); // Guardar token en localStorage
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
