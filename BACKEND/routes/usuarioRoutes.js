import express from 'express';
import { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, eliminarUsuario, loginUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.post('/register', crearUsuario);
router.post('/login', loginUsuario); // Nueva ruta para login
router.delete('/:id', eliminarUsuario);

export default router;
