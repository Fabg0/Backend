import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProviderRequest } from "../api/providers"; // Asegúrate de importar correctamente
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

function CreateProvider() {
  const [formData, setFormData] = useState({
    name: "",
    ruc: "",
    phone: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState(""); // Estado para manejar errores
  const navigate = useNavigate(); // Para redirigir después de crear el proveedor

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.name || !formData.ruc || !formData.email) {
      setError("El nombre, el RUC y el correo electrónico son obligatorios.");
      return;
    }

    try {
      await createProviderRequest(formData); // Llamada para crear el proveedor
      navigate("/providers"); // Redirigir a la lista de proveedores
    } catch (error) {
      console.error("Error al agregar proveedor", error);
      setError("Hubo un error al agregar el proveedor.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          width: "30rem",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" textAlign="center" mb={3}>
            Agregar Proveedor
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <TextField
            label="Nombre del proveedor"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            label="RUC"
            name="ruc"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.ruc}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label="Teléfono"
            name="phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
          />

          <TextField
            label="Dirección"
            name="address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.address}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              backgroundColor: "#73816E",
              ":hover": { backgroundColor: "#556c51" },
            }}
          >
            Agregar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default CreateProvider;
