import Usuario from '../models/usuario.js';

export async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function obtenerUsuarioPorId(req, res) {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function crearUsuario(req, res) {
  const { nombre, email, contraseña } = req.body;
  const nuevoUsuario = new Usuario({ nombre, email, contraseña });
  try {
    const usuarioCreado = await nuevoUsuario.save();
    res.status(201).json(usuarioCreado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function eliminarUsuario(req, res) {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await usuario.remove();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
