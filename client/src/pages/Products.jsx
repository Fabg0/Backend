import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Card, Alert, Spinner } from "react-bootstrap";
import { Edit, Delete, Add } from '@mui/icons-material';
import { getProductsRequest, deleteProductRequest } from "../api/products";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
    
      try {
        const data = await getProductsRequest(token);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setError("No se pudo cargar la lista de productos.");
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteProductRequest(id);
      setProducts(prevProducts => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.log("Error al eliminar producto:", error);
      setError("No se pudo eliminar el producto.");
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <Card className="shadow-sm">
        <Card.Header className=" text-black d-flex justify-content-between align-items-center">
          <h3 className="mb-0 ">Lista de Productos</h3>
          <Link 
            to="/create" 
            className="btn  d-flex align-items-center"
          >
            <Add className="me-2" /> Agregar Producto
          </Link>
        </Card.Header>
        
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <div className="table-responsive">
            <Table striped hover bordered className="text-center align-middle">
              <thead className="table-success">
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categorías</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>s/.{product.price.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${product.stock < 10 ? 'bg-warning' : 'bg-success'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td>{product.category}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Link 
                          to={`/update/${product._id}`} 
                          className="btn btn-outline-primary btn-sm"
                        >
                          <Edit fontSize="small" />
                        </Link>
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => handleDelete(product._id)}
                        >
                          <Delete fontSize="small" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Products;