import { Router } from "express";
import {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createClientSchema } from "../schemas/client.schema.js";


const router = Router();

// Obtener todos los clientes
router.get("/clients", auth, getClients);

// Crear un cliente
router.post("/clients", auth, validateSchema(createClientSchema), createClient);

// Obtener un cliente por ID
router.get("/clients/:id", auth, getClient);

// Actualizar un cliente
router.put("/clients/:id", auth, updateClient);

// Eliminar un cliente
router.delete("/clients/:id", auth, deleteClient);

export default router;
