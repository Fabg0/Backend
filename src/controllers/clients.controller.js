import Client from "../models/client.model.js";
import { createClientSchema } from "../schemas/client.schema.js";  // Asegúrate de tener este esquema para la validación

// Obtener todos los clientes
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ createdBy: req.user.id }).populate("createdBy", "name");
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un cliente por ID
export const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un cliente
export const createClient = async (req, res) => {
  try {
    // Validar los datos de entrada con el esquema
    const validatedData = createClientSchema.parse(req.body);

    // Crear el nuevo cliente usando los datos validados
    const newClient = new Client({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      address: validatedData.address,
      district: validatedData.district, 
      createdBy: req.user.id,
    });

    await newClient.save();
    res.status(201).json(newClient);
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
export const updateClient = async (req, res) => {
  try {
    // Validar los datos de entrada con el esquema
    const validatedData = createClientSchema.parse(req.body);

    // Actualizar el cliente usando los datos validados
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,      // ID del cliente a actualizar
      validatedData,      // Solo los campos validados
      { new: true, runValidators: true } // Retorna el cliente actualizado y aplica validaciones de Mongoose
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" }); // Cliente no encontrado
    }

    // Enviar el cliente actualizado como respuesta
    res.json(updatedClient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Manejar errores de validación
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    // Otros errores (por ejemplo, de base de datos)
    console.error("Error al actualizar el cliente:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Eliminar un cliente
export const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) return res.status(404).json({ message: "Client not found" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
