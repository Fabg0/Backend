import { Router } from "express";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createOrderSchema } from "../schemas/order.schema.js";

const router = Router();

// Obtener todos los pedidos
router.get("/orders", auth, getOrders);

// Crear un pedido
router.post("/orders", auth, validateSchema(createOrderSchema), createOrder);

// Obtener un pedido por ID
router.get("/orders/:id", auth, getOrder);

// Actualizar un pedido
router.put("/orders/:id", auth, updateOrder);

// Eliminar un pedido
router.delete("/orders/:id", auth, deleteOrder);

export default router;
