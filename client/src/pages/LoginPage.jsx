import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";
import {
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Container,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await signin(data);  // Llamar a signin con los datos del formulario
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Dashboard");  // Redirigir si el usuario está autenticado
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "#73816E",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "50%",
          backgroundColor: "white",
          color: "#73816E",
          p: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            "Gestiona la calidad y el diseño que tus clientes merecen..."
          </Typography>
          <Typography variant="h6">
            Inicia sesión para acceder a tu cuenta y gestionar tus servicios
          </Typography>
        </Box>
      </Box>

      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Bienvenido
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Ingresa tus credenciales para continuar
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Correo electrónico"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#fff",
                },
              }}
            />

            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#fff",
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Recordarme"
              />
              <Link
                to="/forgot-password"
                style={{
                  color: "#73816E",
                  textDecoration: "none",
                }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mb: 3,
                bgcolor: "#73816E",
              }}
            >
              INICIAR SESIÓN
            </Button>

            {loginErrors && (
              <Typography color="error" align="center" sx={{ mb: 2 }}>
                {loginErrors}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box sx={{ flex: 1, borderBottom: 1, borderColor: "divider" }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ px: 2 }}
              >
                O continúa con
              </Typography>
              <Box sx={{ flex: 1, borderBottom: 1, borderColor: "divider" }} />
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: "#ddd",
                  color: "#666",
                }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: "#ddd",
                  color: "#666",
                }}
              >
                Facebook
              </Button>
            </Box>

            <Typography variant="body2" align="center" color="text.secondary">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                style={{
                  color: "#73816E",
                  textDecoration: "none",
                }}
              >
                Regístrate
              </Link>
            </Typography>
          </form>
        </Box>
      </Container>
    </Box>
  );
}
