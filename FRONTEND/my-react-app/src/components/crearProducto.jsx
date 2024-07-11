import React, { useState } from 'react';
import '../styles/CrearProducto.css';

const CrearProducto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [productoCreado, setProductoCreado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Asegurar que se envía el token de autenticación
        },
        body: JSON.stringify({ nombre, descripcion, precio }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      setProductoCreado(true); // Actualizar el estado a true cuando se crea el producto
      console.log('Producto creado exitosamente');
    } catch (error) {
      console.error('Error al crear producto:', error.message);
    }
    setProductoCreado(true);
    setTimeout(() => {
      setProductoCreado(false);
      setNombre('');
      setDescripcion('');
      setPrecio('');
    }, 3000);
  };

  return (
    <div className="crear-producto-container">
      <h2 className="crear-producto-title">Crear Producto</h2>
      <form className="crear-producto-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="crear-producto-input"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          className="crear-producto-textarea"
          placeholder="Descripción del producto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="number"
          className="crear-producto-input"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <button type="submit" className="crear-producto-submit">
          Crear Producto
        </button>
      </form>
      {productoCreado && <p className="crear-producto-success">¡Producto creado exitosamente!</p>}
    </div>
  );
};

export default CrearProducto;
