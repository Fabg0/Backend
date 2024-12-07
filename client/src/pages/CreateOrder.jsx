import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrderRequest } from "../api/orders";  // Importa la función de la API

function CreateOrder() {
  const [client, setClient] = useState("");  // Estado para el cliente
  const [products, setProducts] = useState([{ product: "", quantity: 1 }]);  // Estado para los productos (inicia con un producto)
  const [status, setStatus] = useState("Pending");  // Estado para el estado del pedido
  const [error, setError] = useState("");  // Estado para manejar errores
  const [loading, setLoading] = useState(false);  // Estado de carga
  const navigate = useNavigate();  // Para redirigir después de crear el pedido

  // Maneja el cambio de los productos en el formulario
  const handleProductChange = (index, event) => {
    const values = [...products];
    if (event.target.name === "product") {
      values[index].product = event.target.value;
    } else if (event.target.name === "quantity") {
      values[index].quantity = event.target.value;
    }
    setProducts(values);
  };

  // Agrega un nuevo producto al formulario
  const handleAddProduct = () => {
    setProducts([...products, { product: "", quantity: 1 }]);
  };

  // Elimina un producto del formulario
  const handleRemoveProduct = (index) => {
    const values = [...products];
    values.splice(index, 1);
    setProducts(values);
  };

  // Enviar el formulario para crear un nuevo pedido
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const orderData = {
      client,
      products,
      status,
      totalPrice: products.reduce((total, item) => total + item.price * item.quantity, 0),  // Calcula el total
    };

    try {
      await createOrderRequest(orderData);  // Llama a la API para crear el pedido
      navigate("/orders");  // Redirige a la lista de pedidos
    } catch (error) {
      setError("Hubo un error al crear el pedido. Intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h3>Crear Pedido</h3>
      {error && <div className="alert alert-danger">{error}</div>}  {/* Mostrar errores en la UI */}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="client" className="form-label">Cliente</label>
          <input
            type="text"
            className="form-control"
            id="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
          />
        </div>

        {/* Renderiza los productos dinámicamente */}
        {products.map((product, index) => (
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
                  onChange={(event) => handleProductChange(index, event)}
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
                  onChange={(event) => handleProductChange(index, event)}
                  min="1"
                  required
                />
              </div>
              <button
                type="button"
                className="btn btn-danger col-2"
                onClick={() => handleRemoveProduct(index)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={handleAddProduct}
        >
          Agregar Producto
        </button>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Estado</label>
          <select
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pendiente</option>
            <option value="Processing">Procesando</option>
            <option value="Completed">Completado</option>
            <option value="Cancelled">Cancelado</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Pedido"}
        </button>
      </form>
    </div>
  );
}

export default CreateOrder;
