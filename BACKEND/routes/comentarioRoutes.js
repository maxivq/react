import express from "express";
import { obtenerComentarios, obtenerComentarioPorId, crearComentario, eliminarComentario } from "../controllers/comentarioController.js";

const router = express.Router();

router.use(express.json());

router.get('/', obtenerComentarios);
router.get('/:id', obtenerComentarioPorId);
router.post('/', crearComentario);
router.delete('/:id', eliminarComentario);

export default router;
