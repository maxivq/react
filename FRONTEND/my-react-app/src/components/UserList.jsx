import { useEffect, useState } from 'react';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await fetch('http://localhost:5000/api/usuarios');
      const data = await response.json();
      setUsuarios(data);
    };

    fetchUsuarios();
  }, []);

  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario._id}>{usuario.nombre}</li>
      ))}
    </ul>
  );
};

export default UserList;
