import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProductSchema } from "../schemas/product.schema.js";

const router = Router();

// Obtener todos los productos (requiere autenticación)
router.get("/products", auth, getProducts);  

// Crear un producto (requiere autenticación)
router.post("/products", auth, validateSchema(createProductSchema), createProduct);  

// Obtener un producto por ID (requiere autenticación)
router.get("/products/:id", auth, getProduct);  // Deja el middleware auth para este

// Actualizar un producto (requiere autenticación)
router.put("/products/:id", auth, updateProduct);

// Eliminar un producto (requiere autenticación)
router.delete("/products/:id", auth, deleteProduct);

export default router;
