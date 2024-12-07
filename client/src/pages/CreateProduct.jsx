import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProductRequest } from "../api/products";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Paper,
} from "@mui/material";

function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState(""); // Nuevo estado para categoría
  const navigate = useNavigate(); // Para redirigir después de crear un producto

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
    };

    try {
      await createProductRequest(product);
      navigate("/products");
    } catch (error) {
      console.error("Error al agregar producto", error);
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
            Agregar Producto
          </Typography>

          <TextField
            label="Nombre de producto"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Descripción del producto"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            label="Precio"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            label="Stock"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <TextField
            select
            label="Categoría"
            variant="outlined"
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">Seleccionar categoría</MenuItem>
            <MenuItem value="pulseras">Pulseras</MenuItem>
            <MenuItem value="anillos">Anillos</MenuItem>
            <MenuItem value="collares">Collares</MenuItem>
            <MenuItem value="aretes">Aretes</MenuItem>
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

export default CreateProduct;
