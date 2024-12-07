import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderRequest, updateOrderRequest } from "../api/orders";

function UpdateOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderRequest(orderId);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el pedido:", error);
        setError("No se pudo cargar el pedido.");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateOrderRequest(orderId, order);
      navigate("/orders");
    } catch (error) {
      setError("Hubo un error al actualizar el pedido.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Cargando pedido...</div>;
  }

  if (!order) {
    return <div className="text-center text-danger mt-5">No se encontró el pedido.</div>;
  }

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">Actualizar Pedido</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="client" className="form-label">Cliente</label>
          <input
            type="text"
            className="form-control"
            id="client"
            name="client"
            value={order.client}
            onChange={handleChange}
            required
          />
        </div>

        {order.products.map((product, index) => (
          <div key={index} className="mb-3">
            <div className="d-flex justify-content-between">
              <div className="col-5">
                <label htmlFor={`product-${index}`} className="form-label">Producto</label>
                <input
                  type="text"
                  className="form-control"
                  id={`product-${index}`}
                  name="product"
                  value={product.product}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="col-5">
                <label htmlFor={`quantity-${index}`} className="form-label">Cantidad</label>
                <input
                  type="number"
                  className="form-control"
                  id={`quantity-${index}`}
                  name="quantity"
                  value={product.quantity}
                  onChange={(e) => handleChange(e)}
                  min="1"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Estado</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={order.status}
            onChange={handleChange}
          >
            <option value="Pending">Pendiente</option>
            <option value="Processing">Procesando</option>
            <option value="Completed">Completado</option>
            <option value="Cancelled">Cancelado</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Actualizando..." : "Actualizar Pedido"}
        </button>
      </form>
    </div>
  );
}

export default UpdateOrder;
