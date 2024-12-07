import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTasksRequest } from "../api/tasks"; // Asegúrate de tener la función de crear tarea en tu API
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estado, setEstado] = useState("pendiente"); // Estado por defecto
  const navigate = useNavigate(); // Para redirigir después de crear una tarea

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
      estado, // Asumimos que el campo 'date' será asignado por el backend
    };

    try {
      await createTasksRequest(task); // Enviar la solicitud de creación de tarea
      navigate("/tasks"); // Redirigir a la lista de tareas
    } catch (error) {
      console.error("Error al agregar tarea", error);
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
            Agregar Tarea
          </Typography>

          <TextField
            label="Título de la tarea"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Descripción de la tarea"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            select
            label="Estado"
            variant="outlined"
            fullWidth
            margin="normal"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="en progreso">En progreso</MenuItem>
            <MenuItem value="completado">Completado</MenuItem>
          </TextField>

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

export default CreateTask;
