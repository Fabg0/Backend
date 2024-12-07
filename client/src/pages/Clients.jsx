import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getClientsRequest, deleteClientRequest } from "../api/clients";
import { CircularProgress } from "@mui/material"; // Para mostrar un indicador de carga
import { Button, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getClientsRequest(token);
        setClients(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteClientRequest(id);
      setClients(clients.filter((client) => client._id !== id));
    } catch (error) {
      console.log("Error al eliminar cliente:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column w-100 justify-content-center align-items-center py-4">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-center">Lista de Clientes</h3>
          <Link to="/create-client">
            <Button variant="contained" color="success">
              Agregar cliente +
            </Button>
          </Link>
        </div>
        <TableContainer component={Paper} className="shadow">
          <Table>
            <TableHead style={{ backgroundColor: "#D5F5E3" }}>
              <TableRow>
                <TableCell align="center"><strong>Nombre</strong></TableCell>
                <TableCell align="center"><strong>Email</strong></TableCell>
                <TableCell align="center"><strong>Teléfono</strong></TableCell>
                <TableCell align="center"><strong>Dirección</strong></TableCell>
                <TableCell align="center"><strong>Distrito</strong></TableCell>
                <TableCell align="center"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client._id} hover>
                  <TableCell align="center">{client.name}</TableCell>
                  <TableCell align="center">{client.email}</TableCell>
                  <TableCell align="center">{client.phone}</TableCell>
                  <TableCell align="center">{client.address}</TableCell>
                  <TableCell align="center">{client.district || "No especificado"}</TableCell>
                  <TableCell align="center">
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/update-client/${client._id}`}>
                        <Button variant="outlined" color="primary">
                          Editar
                        </Button>
                      </Link>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(client._id)}
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

export default Clients;
