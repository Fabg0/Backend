import axios from "./axios";

const API_URL = "http://localhost:4000/api/providers";

// Obtener todos los proveedores con autenticación
export const getProvidersRequest = async () => {
  const token = localStorage.getItem("token"); // Obtén el token del localStorage
  try {
    const response = await axios.get("/providers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener proveedores:", error.response || error);
    throw error;
  }
};

// Crear un proveedor
export const createProviderRequest = async (formData) => {
  const token = localStorage.getItem("token"); // Obtén el token del localStorage
  try {
    const response = await axios.post(
      "http://localhost:4000/api/providers", // URL de creación de proveedor
      formData, // Los datos del nuevo proveedor
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token para autenticación
        },
        withCredentials: true, // Si se requieren cookies, activa esta opción
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear proveedor:", error.response || error);
    throw new Error("Error al crear el proveedor");
  }
};

// Actualizar un proveedor
export const updateProviderRequest = async (provider) => {
  const token = localStorage.getItem("token"); // Obtén el token del localStorage

  try {
    const response = await axios.put(
      `http://localhost:4000/api/providers/${provider._id}`, // Incluye el ID del proveedor
      provider, // Datos del proveedor a actualizar
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token en el encabezado
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar proveedor:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un proveedor
export const deleteProviderRequest = async (id) => {
  const token = localStorage.getItem("token"); // Obtén el token del localStorage
  try {
    const response = await axios.delete(`/providers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Token en el encabezado Authorization
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    throw error;
  }
};

// Obtener un proveedor por ID
export const getProviderRequest = async (id) => {
  const token = localStorage.getItem("token"); // Obtén el token del localStorage
  try {
    const response = await axios.get(`/providers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Token en el encabezado Authorization
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener proveedor:", error);
    throw error;
  }
};
