import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductRequest, updateProductRequest } from "../api/products";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar Bootstrap si aún no lo has hecho

const UpdateProduct = () => {
  const { id } = useParams(); // ID del producto desde la URL
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "", // Añadido para la categoría
  });
  const [loading, setLoading] = useState(true); // Estado para saber si está cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Inicia carga
        const response = await getProductRequest(id); // Obtén datos del producto
        setProduct(response); // Actualiza estado del producto
      } catch (err) {
        console.error("Error al obtener el producto:", err);
        setError("Producto no encontrado o error al cargar datos."); // Guarda el mensaje de error
      } finally {
        setLoading(false); // Finaliza carga
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value, // Convierte precio y stock a números
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación de datos
    if (!product.name || !product.description || product.price <= 0 || product.stock < 0 || !product.category) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }
  
    try {
      // Actualiza el producto en la API
      await updateProductRequest({ ...product, _id: id }); // Asegura que incluimos el ID
      alert("Producto actualizado correctamente.");
      navigate("/products"); // Redirige después de guardar
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      alert("No se pudo actualizar el producto.");
    }
  };

  // Renderiza mientras carga o si hay error
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        {/* Campo para seleccionar la categoría */}
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select
            className="form-control"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            <option value="pulseras">Pulseras</option>
            <option value="anillos">Anillos</option>
            <option value="collares">Collares</option>
            <option value="aretes">Aretes</option>
          </select>
        </div>

        <button type="submit" className="btn px-5"
                style={{
                  backgroundColor: "#73816E",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  textDecoration: "none",
                }}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;

