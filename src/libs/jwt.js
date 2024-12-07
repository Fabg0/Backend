import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,  // Los datos que deseas incluir en el token (por ejemplo, el id del usuario)
      TOKEN_SECRET,  // Tu clave secreta para firmar el token
      {
        expiresIn: "14d",  // Aquí puedes ajustar el tiempo de expiración
      },
      (err, token) => {
        if (err) {
          reject(err);  // Si ocurre un error al generar el token, lo rechazamos
        } else {
          resolve(token);  // Si el token se genera correctamente, lo devolvemos
        }
      }
    );
  });
}
