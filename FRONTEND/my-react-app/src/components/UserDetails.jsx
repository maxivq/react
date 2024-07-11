import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      const response = await fetch(`http://localhost:5000/api/usuarios${id}`);
      const data = await response.json();
      setUsuario(data);
    };

    fetchUsuario();
  }, [id]);

  if (!usuario) return <div>Loading...</div>;

  return (
    <div>
      <h1>{usuario.nombre}</h1>
      <p>{usuario.email}</p>
    </div>
  );
};

export default UserDetails;
