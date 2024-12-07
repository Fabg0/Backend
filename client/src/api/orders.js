import axios from "./axios";  // Importa la instancia de axios configurada

const API_URL = "http://localhost:4000/api/orders";  // Endpoint base para órdenes

// Obtener todos los pedidos creados por el usuario
export const getOrdersRequest = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Retorna los pedidos
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    throw error;
  }
};

// Crear un nuevo pedido
export const createOrderRequest = async (order) => {
  try {
    const response = await axios.post(API_URL, order);
    return response.data;  // Retorna el pedido creado
  } catch (error) {
    console.error("Error al crear pedido:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Actualizar un pedido existente
export const updateOrderRequest = async (id, order) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, order);
    return response.data;  // Retorna el pedido actualizado
  } catch (error) {
    console.error("Error al actualizar pedido:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un pedido
export const deleteOrderRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;  // Retorna la respuesta
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    throw error;
  }
};

// Obtener un pedido por ID
export const getOrderRequest = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;  // Retorna el pedido
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    throw error;
  }
};
