import { Router } from "express";
import {
  getProviders,
  getProvider,
  createProvider,
  updateProvider,
  deleteProvider,
} from "../controllers/providers.controller.js"; // Ajusta la ruta de tu controlador
import { auth } from "../middlewares/auth.middleware.js"; // Verifica si necesitas autenticación
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProviderSchema } from "../schemas/provider.schema.js"; // Ajusta la ruta de tu esquema


const router = Router();

// Obtener todos los proveedores
router.get("/providers", auth, getProviders);

// Crear un proveedor
router.post("/providers", auth, validateSchema(createProviderSchema), createProvider);

// Obtener un proveedor por ID
router.get("/providers/:id", auth, getProvider);

// Actualizar un proveedor
router.put("/providers/:id", auth, updateProvider);

// Eliminar un proveedor
router.delete("/providers/:id", auth, deleteProvider);

export default router;
