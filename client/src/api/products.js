import axios from "./axios";  // Importa la instancia de axios configurada

const API_URL = "http://localhost:4000/api/products";  // Puedes omitir la URL base porque ya está definida en axios.js

// Obtener todos los productos con autenticación
export const getProductsRequest = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Retorna los productos desde la respuesta
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

// Crear un producto
export const createProductRequest = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    console.log("Producto creado:", response);
  } catch (error) {
    console.error("Error al agregar producto:", error.response ? error.response.data : error);
  }
};

// Actualizar un producto
export const updateProductRequest = async (product) => {
  try {
    const response = await axios.put(`${API_URL}/${product._id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un producto
export const deleteProductRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;  // Retorna la respuesta
  } catch (error) {
    throw error;  // Lanza el error para manejarlo en el componente
  }
};

// Obtener un producto por ID
export const getProductRequest = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};


