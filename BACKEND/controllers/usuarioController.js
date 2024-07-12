import Usuario from '../models/usuario.js';

// Obtener todos los usuarios
async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Obtener un usuario por su ID
async function obtenerUsuarioPorId(req, res) {
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

// Crear un nuevo usuario
async function crearUsuario(req, res) {
  const { nombre, email, contraseña } = req.body;
  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }
  try {
    const nuevoUsuario = new Usuario({ nombre, email, contraseña });
    const usuarioCreado = await nuevoUsuario.save();
    res.status(201).json(usuarioCreado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Eliminar un usuario por su ID
async function eliminarUsuario(req, res) {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await usuario.remove();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Iniciar sesión de usuario
async function loginUsuario(req, res) {
  const { email, contraseña } = req.body;
  if (!email || !contraseña) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }
  try {
    const usuario = await Usuario.findOne({ email, contraseña });
    if (!usuario) {
      return res.status(404).json({ message: 'Credenciales inválidas' });
    }
    // Aquí podrías implementar la lógica para generar y enviar un token JWT
    res.json({ message: 'Inicio de sesión exitoso', usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, eliminarUsuario, loginUsuario };
