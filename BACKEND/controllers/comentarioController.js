import Comentario from '../models/comentario.js';

  async function obtenerComentarios(req, res) {
    try {
      const comentarios = await Comentario.find();
      res.json(comentarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function obtenerComentarioPorId(req, res) {
    try {
      const comentario = await Comentario.findById(req.params.id);
      if (!comentario) {
        return res.status(404).json({ message: 'Comentario no encontrado' });
      }
      res.json(comentario);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function crearComentario(req, res) {
    const { usuario, contenido } = req.body;
    if (!usuario || !contenido) {
      return res.status(400).json({ message: 'Usuario y contenido son requeridos' });
    }
    try {
      const nuevoComentario = new Comentario({ usuario, contenido });
      const comentarioCreado = await nuevoComentario.save();
      res.status(201).json(comentarioCreado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function actualizarComentario(req, res) {
    try {
      const comentario = await Comentario.findById(req.params.id);
      if (!comentario) {
        return res.status(404).json({ message: 'Comentario no encontrado' });
      }
      Object.assign(comentario, req.body);
      const comentarioActualizado = await comentario.save();
      res.json(comentarioActualizado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function eliminarComentario(req, res) {
    try {
      const comentario = await Comentario.findById(req.params.id);
      if (!comentario) {
        return res.status(404).json({ message: 'Comentario no encontrado' });
      }
      await comentario.remove();
      res.json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


export { obtenerComentarios, obtenerComentarioPorId, crearComentario, eliminarComentario }