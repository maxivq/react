import express from "express";
import usuarioRoutes from "./usuarioRoutes.js";
import productoRouter from "./productoRoutes.js";
import pedidoRouter from "./pedidoRoutes.js";
import comentarioRouter from "./comentarioRoutes.js";

const router = express.Router();

router.use("/usuarios", usuarioRoutes);
router.use("/productos", productoRouter);
router.use("/pedidos", pedidoRouter);
router.use("/comentarios", comentarioRouter);

export default router;
