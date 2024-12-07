import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("Token recibido:", token);  // Asegúrate de que el token se recibe correctamente

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
          console.error("Error al verificar el token:", err.message);
          console.log("Token recibido:", token);
          return res.status(401).json({ message: "Token inválido o expirado", error: err.message });
      }
      console.log("Token decodificado correctamente:", decoded);
      console.log("Tiempo actual:", Math.floor(Date.now() / 1000));
      req.user = decoded;
      next();
  });
  
  
  } catch (error) {
    console.log("Error en middleware de autenticación", error);
    return res.status(500).json({ message: error.message });
  }
};
