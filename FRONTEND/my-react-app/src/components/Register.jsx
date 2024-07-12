import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/AuthForms.css'; // Importar estilos para formularios de autenticación

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [registroCompletado, setRegistroCompletado] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/usuarios/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, contraseña }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      console.log('Usuario registrado exitosamente');
      setRegistroCompletado(true); // Actualizar estado para mostrar mensaje de éxito

      setTimeout(() => {
        setRedirect(true); // Activar redireccionamiento después de unos segundos
      }, 3000); // Esperar 3 segundos antes de redirigir
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
    }
  };

  // Renderizar mensaje de registro completado y redirigir
  if (redirect) {
    return <Navigate to="/" />;
  }

  // Renderizar formulario de registro o mensaje de éxito
  return (
    <div className="auth-form-container">
      {registroCompletado ? (
        <>
          <h2 className="auth-form-title">¡Registro completado!</h2>
          <p>Redirigiendo a la página de inicio...</p>
        </>
      ) : (
        <>
          <h2 className="auth-form-title">Registrarse</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="auth-form-input"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
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
              Registrarse
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
