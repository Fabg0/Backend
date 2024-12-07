import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import Cookies from "js-cookie";
import { loginRequest } from "../api/auth";  // Asegúrate de importar las funciones necesarias

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Función para iniciar sesión
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.status === 200) {
        setUser(res.data); // Guardar el usuario si es exitoso
        setIsAuthenticated(true);

        // Guardar el nuevo token en las cookies o en localStorage
        Cookies.set("token", res.data.token);  // Guardar el token en las cookies
        // O, si prefieres usar localStorage, puedes hacer:
        // localStorage.setItem("token", res.data.token);
      }
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    Cookies.remove("token");  // Remover el token cuando se cierre sesión
    setUser(null);
    setIsAuthenticated(false);
  };

  // Verificar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const checkLogin = () => {
      const token = Cookies.get("token");  // Obtener el token de las cookies
      if (token) {
        setIsAuthenticated(true);
        // Aquí puedes agregar más lógica para decodificar el token si es necesario
      }
      setLoading(false);
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signin, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
