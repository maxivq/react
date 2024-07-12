import React, { useState, useEffect } from 'react';

const UserListSimple = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/usuarios', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener la lista de usuarios');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios (Nombres y Correos)</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <strong>{user.nombre}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListSimple;
