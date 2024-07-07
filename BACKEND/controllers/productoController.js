import Producto from '../models/producto.js';


  async function obtenerProductos(req, res) {
    try {
      const productos = await Producto.find();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function obtenerProductoPorId(req, res) {
    try {
      const producto = await Producto.findById(req.params.id);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function crearProducto(req, res) {
    const { nombre, precio, descripcion } = req.body;
    if (!nombre || !precio) {
      return res.status(400).json({ message: 'Nombre y precio son requeridos' });
    }
    try {
      const nuevoProducto = new Producto({ nombre, precio, descripcion });
      const productoCreado = await nuevoProducto.save();
      res.status(201).json(productoCreado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function actualizarProducto(req, res) {
    try {
      const producto = await Producto.findById(req.params.id);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      Object.assign(producto, req.body);
      const productoActualizado = await producto.save();
      res.json(productoActualizado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function eliminarProducto(req, res) {
    try {
      const producto = await Producto.findById(req.params.id);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      await producto.remove();
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

export { obtenerProductos, obtenerProductoPorId, crearProducto, eliminarProducto }