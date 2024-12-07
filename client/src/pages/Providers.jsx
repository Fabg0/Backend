import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProvidersRequest, deleteProviderRequest } from "../api/providers";
import { Button } from "@mui/material";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress } from "@mui/material";

function Providers() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getProvidersRequest(token);
        setProviders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProviderRequest(id);
      setProviders(providers.filter((provider) => provider._id !== id));
    } catch (error) {
      console.log("Error al eliminar proveedor:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="d-flex">
      <div className="sidebar"> {/* Asume que el Sidebar está aquí */}
        {/* Código del sidebar */}
      </div>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Lista de Proveedores</h3>
          <Link to="/create-provider">
            <Button variant="contained" color="success">
              Agregar proveedor +
            </Button>
          </Link>
        </div>
        <TableContainer component={Paper} className="shadow-lg">
          <Table className="table table-hover">
            <TableHead>
              <TableRow style={{ backgroundColor: "#d4edda" }}>
                <TableCell className="text-center fw-bold">Nombre</TableCell>
                <TableCell className="text-center fw-bold">Email</TableCell>
                <TableCell className="text-center fw-bold">Teléfono</TableCell>
                <TableCell className="text-center fw-bold">Dirección</TableCell>
                <TableCell className="text-center fw-bold">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider._id}>
                  <TableCell className="text-center">{provider.name}</TableCell>
                  <TableCell className="text-center">{provider.email}</TableCell>
                  <TableCell className="text-center">{provider.phone}</TableCell>
                  <TableCell className="text-center">{provider.address}</TableCell>
                  <TableCell className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/update-provider/${provider._id}`}>
                        <Button variant="outlined" color="primary">
                          Editar
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(provider._id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Providers;
