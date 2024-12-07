import React, { useState, useEffect, useCallback } from "react";
import { Card, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { 
  MoreVert as MoreVertIcon, 
  ShoppingCart as ShoppingCartIcon, 
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  ListAlt as ListIcon
} from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { getOrdersRequest, deleteOrderRequest } from "../api/orders";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pendiente':
        return 'warning';
      case 'completado':
        return 'success';
      case 'cancelado':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
    
      try {
        const data = await getOrdersRequest(token);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
        setError("No se pudo cargar la lista de pedidos.");
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteOrderRequest(id);
      setOrders(prevOrders => prevOrders.filter((order) => order._id !== id));
    } catch (error) {
      console.log("Error al eliminar pedido:", error);
      setError("No se pudo eliminar el pedido.");
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Mis Pedidos</h2>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row xs={1} md={2} lg={3} className="g-4">
        {orders.map((order) => (
          <Col key={order._id}>
            <Card className="h-100 shadow-lg rounded-4 overflow-hidden"> {/* Added rounded-4 and shadow-lg */}
              <Card.Body className="d-flex flex-column justify-content-between text-center"> {/* Added text-center and flex-column */}
                <div>
                  <Card.Title className="mb-3 d-flex justify-content-center align-items-center">
                    <ShoppingCartIcon className="me-2 text-primary" />
                    {order.client.name}
                  </Card.Title>
                  
                  <Card.Subtitle className="mb-2 text-muted d-flex justify-content-center align-items-center">
                    <ListIcon className="me-2" />
                    Productos:
                  </Card.Subtitle>
                  
                  <div className="mb-3">
                    {order.products.map((item, index) => (
                      <div key={index} className="mb-1">
                        {item.product.name} x {item.quantity}
                      </div>
                    ))}
                  </div>
                </div>

                <hr />

                <div>
                  <div className="mb-2 fw-bold">
                    Total: S/. {order.totalPrice} 
                  </div>
                  <div className="mb-2 d-flex justify-content-center align-items-center">
                    <CalendarIcon className="me-2 text-info" />
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                  <div className="d-flex justify-content-center">
                    <Badge 
                      bg={getStatusColor(order.status)} 
                      className="mt-2"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Orders;