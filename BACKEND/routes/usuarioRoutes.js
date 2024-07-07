import express from "express";
import { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, eliminarUsuario } from "../controllers/usuarioController.js";

const router = express.Router();

router.use(express.json());

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.post('/', crearUsuario);
router.delete('/:id', eliminarUsuario);

export default router;