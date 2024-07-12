import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './styles.css';
import Home from './components/Home';
import Login from './components/login';
import Register from './components/Register';
import CrearProducto from './components/crearProducto';
import ListaProductos from './components/ListaProductos';
import UserListSimple from './components/UserListSimple';
import UserListFull from './components/UserListFull';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      // Verificar si el usuario es administrador
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email === 'admin@example.com') {
        setIsAdmin(true);
      }
    } else {
      setLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {loggedIn && (
              <>
                <li>
                  <Link to="/crear-producto">Crear Producto</Link>
                </li>
                <li>
                  <Link to="/lista-productos">Lista de Productos</Link>
                </li>
                {isAdmin && (
                  <>
                    <li>
                      <Link to="/usuarios-simples">Usuarios (Nombres y Correos)</Link>
                    </li>
                    <li>
                      <Link to="/usuarios-completos">Usuarios (Detalles Completos)</Link>
                    </li>
                  </>
                )}
              </>
            )}
            {!loggedIn && (
              <>
                <li>
                  <Link to="/login">Iniciar Sesión</Link>
                </li>
                <li>
                  <Link to="/registro">Registrarse</Link>
                </li>
              </>
            )}
            {loggedIn && (
              <li>
                <button onClick={handleLogout}>Cerrar Sesión</button>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />} />
          <Route path="/registro" element={<Register />} />
          {loggedIn && <Route path="/crear-producto" element={<CrearProducto />} />}
          {loggedIn && <Route path="/lista-productos" element={<ListaProductos />} />}
          {isAdmin && <Route path="/usuarios-simples" element={<UserListSimple />} />}
          {isAdmin && <Route path="/usuarios-completos" element={<UserListFull />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
