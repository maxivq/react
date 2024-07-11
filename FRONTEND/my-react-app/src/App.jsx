import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
          <li>
            <Link to="/register">Registrarse</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
