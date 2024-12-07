import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Typography, Box, Grid, Container, Alert } from "@mui/material";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '1500px',
        margin: 0,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5'
      }}
    >
      <Container maxWidth="sm" sx={{ 
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Card
          sx={{
            width: '100%',
            padding: { xs: 2, sm: 4 },
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.18)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {Array.isArray(registerErrors) &&
            registerErrors.map((error, i) => (
              <Alert severity="error" sx={{ mb: 2, width: '100%' }} key={i}>
                {error}
              </Alert>
            ))}
          
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              color: '#73816E',
              mb: 4
            }}
          >
           Crear una cuenta
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Nombre de usuario"
                  fullWidth
                  variant="outlined"
                  {...register("username")}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  autoFocus
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#1e88e5',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Correo electrónico"
                  fullWidth
                  variant="outlined"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#1e88e5',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  type="password"
                  fullWidth
                  variant="outlined"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#1e88e5',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirma contraseña"
                  type="password"
                  fullWidth
                  variant="outlined"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#1e88e5',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    backgroundColor: '#73816E',
                   
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                  }}
                >
                  Registrar
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography
            variant="body1"
            sx={{
              mt: 4,
              textAlign: 'center',
              color: 'text.secondary'
            }}
          >
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              style={{
                color: '#73816E',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Iniciar sesión
            </Link>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}

export default Register;