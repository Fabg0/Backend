import Provider from "../models/provider.model.js";
import { createProviderSchema } from "../schemas/provider.schema.js";  // Asegúrate de tener este esquema para la validación


// Obtener todos los clientes
export const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find({ createdBy: req.user.id }).populate("createdBy", "name");
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un cliente por ID
export const getProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un cliente
export const createProvider = async (req, res) => {
  try {
    // Validar los datos de entrada con el esquema
    const validatedData = createProviderSchema.parse(req.body);

    const newProvider = new Provider({
      name : validatedData.name,
      ruc : validatedData.ruc,
      phone : validatedData.phone,
      email : validatedData.email,
      address : validatedData.address,
      createdBy : req.user.id,
    });

    await newProvider.save();
    res.status(201).json(newProvider);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Manejar errores de validación
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    res.status(500).json({ message: error.message });
  }
};

// Actualizar un cliente
export const updateProvider = async (req, res) => {
  try {
    // Validar los datos de entrada con el esquema
    const validatedData = createProviderSchema.parse(req.body);

    // Actualizar el cliente usando los datos validados
    const updatedProvider = await Provider.findByIdAndUpdate(
      req.params.id,      // ID del cliente a actualizar
      validatedData,      // Solo los campos validados
      { new: true, runValidators: true } // Retorna el cliente actualizado y aplica validaciones de Mongoose
    );

    if (!updatedProvider) {
      return res.status(404).json({ message: "Provider not found" }); // Cliente no encontrado
    }

    // Enviar el cliente actualizado como respuesta
    res.json(updatedProvider);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Manejar errores de validación
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    // Otros errores (por ejemplo, de base de datos)
    console.error("Error al actualizar el proveedor:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Eliminar un cliente
export const deleteProvider = async (req, res) => {
  try {
    const deletedProvider = await Provider.findByIdAndDelete(req.params.id);
    if (!deletedProvider) return res.status(404).json({ message: "Provider not found" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
