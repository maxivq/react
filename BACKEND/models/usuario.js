import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // Campo para marcar si es administrador
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
