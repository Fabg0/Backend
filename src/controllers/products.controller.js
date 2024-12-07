import Product from "../models/product.model.js";
import { createProductSchema } from "../schemas/product.schema.js";

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.user.id }).populate("createdBy", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,  // Aquí agregas la categoría
      createdBy: req.user.id,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    // Validar los datos de entrada con el esquema
    const validatedData = createProductSchema.parse(req.body);

    // Actualizar el producto usando los datos validados
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,      // ID del producto a actualizar
      validatedData,      // Solo los campos validados
      { new: true, runValidators: true } // Retorna el producto actualizado y aplica validaciones de Mongoose
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" }); // Producto no encontrado
    }

    // Enviar el producto actualizado como respuesta
    res.json(updatedProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Manejar errores de validación
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    // Otros errores (por ejemplo, de base de datos)
    console.error("Error al actualizar el producto:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
