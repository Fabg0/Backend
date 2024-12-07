import axios from "./axios";  // Importa la instancia de axios configurada

const API_URL = "http://localhost:4000/api/tasks";  // Puedes omitir la URL base porque ya está definida en axios.js

// Obtener todos los productos con autenticación
export const getTasksRequest = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Retorna los productos desde la respuesta
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    throw error;
  }
};

// Crear un producto
export const createTasksRequest = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    console.log("Proyecto creado:", response);
  } catch (error) {
    console.error("Error al agregar producto:", error.response ? error.response.data : error);
  }
};

// Actualizar un producto
export const updateTasksRequest = async (task) => {
  try {
    const response = await axios.put(`${API_URL}/${task._id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar proyecto:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un producto
export const deleteTasksRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;  // Retorna la respuesta
  } catch (error) {
    throw error;  // Lanza el error para manejarlo en el componente
  }
};

// Obtener un producto por ID
export const getTaskRequest = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};
