import axios from "./axios";

const API_URL = "http://localhost:4000/api/clients";

// Obtener todos los clientes con autenticación
export const getClientsRequest = async () => {
  const token = localStorage.getItem('token'); // Obtén el token del localStorage
  try {
    const response = await axios.get("/clients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener clientes:", error.response || error);
    throw error;
  }
};

// Crear un cliente
export const createClientRequest = async (formData) => {
    try {
      const response = await axios.post("http://localhost:4000/api/clients", formData, {
        withCredentials: true, // Si es necesario para las cookies
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al crear el cliente");
    }
  };
  
  

// Actualizar un cliente
export const updateClientRequest = async (client) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `http://localhost:4000/api/clients/${client._id}`, // Incluye el ID en la URL
      client, // Envía el cliente como cuerpo de la solicitud
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token en el encabezado
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar cliente:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un cliente
export const deleteClientRequest = async (id) => {
  const token = localStorage.getItem('token'); // Obtén el token del localStorage
  try {
    const response = await axios.delete(`/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Aquí se envía el token con el encabezado Authorization
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    throw error;
  }
};

// Obtener un cliente por ID
export const getClientRequest = async (id) => {
  const token = localStorage.getItem('token'); // Obtén el token del localStorage
  try {
    const response = await axios.get(`/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Aquí se envía el token con el encabezado Authorization
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    throw error;
  }
};
