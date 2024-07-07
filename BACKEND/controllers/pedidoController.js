import Pedido from '../models/pedido.js';


  async function obtenerPedidos(req, res) {
    try {
      const pedidos = await Pedido.find();
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function obtenerPedidoPorId(req, res) {
    try {
      const pedido = await Pedido.findById(req.params.id);
      if (!pedido) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function crearPedido(req, res) {
    const { usuario, productos, total } = req.body;
    if (!usuario || !productos || !total) {
      return res.status(400).json({ message: 'Usuario, productos y total son requeridos' });
    }
    try {
      const nuevoPedido = new Pedido({ usuario, productos, total });
      const pedidoCreado = await nuevoPedido.save();
      res.status(201).json(pedidoCreado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function actualizarPedido(req, res) {
    try {
      const pedido = await Pedido.findById(req.params.id);
      if (!pedido) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
      Object.assign(pedido, req.body);
      const pedidoActualizado = await pedido.save();
      res.json(pedidoActualizado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function eliminarPedido(req, res) {
    try {
      const pedido = await Pedido.findById(req.params.id);
      if (!pedido) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
      await pedido.remove();
      res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


export { obtenerPedidos, crearPedido, obtenerPedidoPorId, eliminarPedido }