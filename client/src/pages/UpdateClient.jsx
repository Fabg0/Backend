import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientRequest, updateClientRequest } from "../api/clients";

const UpdateClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    district: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const response = await getClientRequest(id);
        setClient(response);
      } catch (err) {
        setError("Cliente no encontrado o error al cargar datos.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchClient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!client.name || !client.email || !client.phone || !client.address || !client.district) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      await updateClientRequest({ ...client, _id: id });
      alert("Cliente actualizado correctamente.");
      navigate("/clients");
    } catch (error) {
      alert("No se pudo actualizar el cliente.");
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header text-black text-center">
          <h2>Editar Cliente</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={client.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={client.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="form-control"
                  value={client.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="district" className="form-label">Distrito</label>
                <select
                  name="district"
                  className="form-control"
                  value={client.district}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar distrito</option>
                  
            <option value="Ate">Ate</option>
            <option value="Barranco">Barranco</option>
            <option value="Breña">Breña</option>
            <option value="Carabayllo">Carabayllo</option>
            <option value="Chaclacayo">Chaclacayo</option>
            <option value="Chorrillos">Chorrillos</option>
            <option value="Cieneguilla">Cieneguilla</option>
            <option value="Comas">Comas</option>
            <option value="El Agustino">El Agustino</option>
            <option value="Independencia">Independencia</option>
            <option value="Jesus María">Jesús María</option>
            <option value="La Molina">La Molina</option>
            <option value="La Victoria">La Victoria</option>
            <option value="Lince">Lince</option>
            <option value="Los Olivos">Los Olivos</option>
            <option value="Lurigancho">Lurigancho</option>
            <option value="Lurin">Lurín</option>
            <option value="Magdalena del Mar">Magdalena del Mar</option>
            <option value="Miraflores">Miraflores</option>
            <option value="Pueblo Libre">Pueblo Libre</option>
            <option value="Pachacámac">Pachacámac</option>
            <option value="San Bartolo">San Bartolo</option>
            <option value="San Borja">San Borja</option>
            <option value="San Isidro">San Isidro</option>
            <option value="San Juan de Lurigancho">San Juan de Lurigancho</option>
            <option value="San Juan de Miraflores">San Juan de Miraflores</option>
            <option value="San Luis">San Luis</option>
            <option value="San Martín de Porres">San Martín de Porres</option>
            <option value="San Miguel">San Miguel</option>
            <option value="Santiago de Surco">Santiago de Surco</option>
            <option value="Surquillo">Surquillo</option>
            <option value="Ventanilla">Ventanilla</option>
            <option value="Villa El Salvador">Villa El Salvador</option>
            <option value="Villa María del Triunfo">Villa María del Triunfo</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Dirección</label>
              <input
                type="text"
                name="address"
                id="address"
                className="form-control"
                value={client.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/clients")}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-success">Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateClient;
