import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './styles.css';
import Home from './components/Home';
import Login from './components/login';
import Register from './components/Register';
import CrearProducto from './components/crearProducto';
import ListaProductos from './components/ListaProductos';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const PrivateRoute = ({ element, ...rest }) => {
    return loggedIn ? element : <Navigate to="/login" />;
  };

  const PublicRoute = ({ element, ...rest }) => {
    return loggedIn ? <Navigate to="/" /> : element;
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
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
              <>
                <li>
                  <Link to="/crear-producto">Crear Producto</Link>
                </li>
                <li>
                  <Link to="/lista-productos">Lista de Productos</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Cerrar Sesión</button>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoute element={<Login setLoggedIn={handleLogin} />} />} />
          <Route path="/registro" element={<PublicRoute element={<Register setLoggedIn={handleLogin} />} />} />
          <Route path="/crear-producto" element={<PrivateRoute element={<CrearProducto />} />} />
          <Route path="/lista-productos" element={<PrivateRoute element={<ListaProductos />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
