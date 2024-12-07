import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClientRequest } from "../api/clients";
import { Container, Box, Typography, TextField, Button, MenuItem, Alert } from "@mui/material";

function CreateClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    district: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.district) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      await createClientRequest(formData);
      navigate("/clients");
    } catch (error) {
      console.error("Error al agregar cliente", error);
      setError("Hubo un error al agregar el cliente.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <Typography variant="h5" textAlign="center" marginBottom={3} color="#73816E">
          Agregar Cliente
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 3 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Nombre del cliente"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
        />

        <TextField
          label="Teléfono"
          name="phone"
          fullWidth
          margin="normal"
          value={formData.phone}
          onChange={handleChange}
          variant="outlined"
        />

        <TextField
          label="Dirección"
          name="address"
          fullWidth
          margin="normal"
          value={formData.address}
          onChange={handleChange}
          variant="outlined"
        />

        <TextField
          label="Distrito"
          name="district"
          select
          fullWidth
          margin="normal"
          value={formData.district}
          onChange={handleChange}
          variant="outlined"
        >
          {[
            "Ate", "Barranco", "Breña", "Carabayllo", "Chaclacayo", "Chorrillos",
            "Cieneguilla", "Comas", "El Agustino", "Independencia", "Jesús María",
            "La Molina", "La Victoria", "Lince", "Los Olivos", "Lurigancho",
            "Lurín", "Magdalena del Mar", "Miraflores", "Pueblo Libre",
            "Pachacámac", "San Bartolo", "San Borja", "San Isidro",
            "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis",
            "San Martín de Porres", "San Miguel", "Santiago de Surco",
            "Surquillo", "Ventanilla", "Villa El Salvador", "Villa María del Triunfo",
          ].map((district) => (
            <MenuItem key={district} value={district}>
              {district}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#73816E",
            color: "#fff",
            marginTop: "1rem",
            padding: "0.75rem",
            ":hover": { backgroundColor: "#5e6b5d" },
          }}
        >
          Agregar
        </Button>
      </Box>
    </Container>
  );
}

export default CreateClient;
