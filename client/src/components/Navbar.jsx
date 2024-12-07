import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#73816E' }} className="mb-4">
        <Container maxWidth="lg">
          <Toolbar>
            {/* Título o logo */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to={isAuthenticated ? "/Dashboard" : "/"} style={{ color: '#F9F9F4', textDecoration: 'none' }}>
                YourShine
              </Link>
            </Typography>

            {/* Opciones del usuario */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {isAuthenticated ? (
                <>
                  {/* Nombre del usuario */}
                  <Typography variant="body1" sx={{ color: '#F9F9F4' }}>
                    Bienvenid@ {user ? user.username : "Usuario"}
                  </Typography>
                  
                  {/* Botón para cerrar sesión */}
                  <Button
                    onClick={() => logout()}
                    variant="outlined"
                    size="small"
                    sx={{
                      color: '#F9F9F4',
                      borderColor: '#F9F9F4',
                      "&:hover": { borderColor: '#D8D8D8' },
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  {/* Botones para iniciar sesión o registrarse */}
                  <ButtonLink
                    style={{ color: '#F9F9F4', textDecoration: 'none' }}
                    to="/login"
                  >
                    Iniciar Sesión
                  </ButtonLink>
                  <ButtonLink
                    style={{ color: '#F9F9F4', textDecoration: 'none' }}
                    to="/register"
                  >
                    Registrarse
                  </ButtonLink>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Espaciador para evitar que el contenido se superponga con la barra */}
      <Toolbar />
    </>
  );
}
