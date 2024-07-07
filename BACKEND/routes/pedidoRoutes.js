import express from "express";
import { obtenerPedidos, obtenerPedidoPorId, crearPedido, eliminarPedido } from "../controllers/pedidoController.js";

const router = express.Router();

router.use(express.json());

router.get('/', obtenerPedidos);
router.get('/:id', obtenerPedidoPorId);
router.post('/', crearPedido);
router.delete('/:id', eliminarPedido);

export default router;
