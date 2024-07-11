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

export const crearUsuario = async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  const nuevoUsuario = new Usuario({ nombre, email, contraseña });
  try {
    const usuarioCreado = await nuevoUsuario.save();
    res.status(201).json(usuarioCreado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario || usuario.contraseña !== contraseña) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
    res.json({ message: 'Inicio de sesión exitoso', usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
