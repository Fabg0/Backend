import axios from "axios";
import Cookies from "js-cookie";

// Crear una instancia de axios con el token
const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptar la solicitud para añadir el token en las cabeceras
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");  // Obtener el token de las cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Agregar el token en el header de la solicitud
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
