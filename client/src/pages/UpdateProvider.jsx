import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProviderRequest, updateProviderRequest } from "../api/providers";  // Asegúrate de tener los endpoints correctos

const UpdateProvider = () => {
  const { id } = useParams(); // ID del proveedor desde la URL
  const navigate = useNavigate();

  const [provider, setProvider] = useState({
    name: "",
    ruc: "",
    phone: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(true); // Estado para saber si está cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setLoading(true); // Inicia carga
        const response = await getProviderRequest(id); // Obtén datos del proveedor
        setProvider(response); // Actualiza estado del proveedor
      } catch (err) {
        console.error("Error al obtener el proveedor:", err);
        setError("Proveedor no encontrado o error al cargar datos."); // Guarda el mensaje de error
      } finally {
        setLoading(false); // Finaliza carga
      }
    };

    if (id) fetchProvider();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProvider((prevProvider) => ({
      ...prevProvider,
      [name]: value, // Actualiza el estado del proveedor
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de datos
    if (!provider.name || !provider.ruc || !provider.email) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      // Actualiza el proveedor en la API
      await updateProviderRequest({ ...provider, _id: id }); // Asegura que incluimos el ID
      alert("Proveedor actualizado correctamente.");
      navigate("/providers"); // Redirige después de guardar
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
      alert("No se pudo actualizar el proveedor.");
    }
  };

  // Renderiza mientras carga o si hay error
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Proveedor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={provider.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ruc" className="form-label">RUC</label>
          <input
            type="text"
            name="ruc"
            id="ruc"
            className="form-control"
            value={provider.ruc}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={provider.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Teléfono</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="form-control"
            value={provider.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección</label>
          <input
            type="text"
            name="address"
            id="address"
            className="form-control"
            value={provider.address}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn px-5"              
                     style={{
                          backgroundColor: "#73816E",
                          color: "white",
                          padding: "0.5rem 1rem",
                          borderRadius: "5px",
                          textDecoration: "none",
                        }}>Guardar cambios</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProvider;
