import React, { useState, useEffect } from 'react';
import '../styles/ListaProductos.css';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/productos');
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      const data = await response.json();
      setProductos(data); // Actualiza el estado de productos con los datos obtenidos
    } catch (error) {
      console.error('Error al cargar productos desde la API:', error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/productos/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar producto');
      }
      cargarProductos(); // Actualiza la lista de productos después de eliminar
    } catch (error) {
      console.error('Error al eliminar producto desde la API:', error.message);
    }
  };

  return (
    <div className="productos-container">
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto._id} className="producto">
            <div className="producto-info">
              <div className="producto-nombre">{producto.nombre}</div>
              <div className="producto-precio">${producto.precio}</div>
            </div>
            <div className="producto-buttons">
              <button onClick={() => eliminarProducto(producto._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
