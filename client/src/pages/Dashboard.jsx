import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBox, faTasks, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { getProductsRequest } from "../api/products";
import { getTasksRequest } from "../api/tasks";
import { getClientsRequest } from "../api/clients";
import Sidebar from "../components/Sidebar";
import ProductsChart from "../components/ProductsChart";
import TasksChart from "../components/TaskChart";
import CategoryChart from "../components/CategoryChart";
import ClientsByDistrictChart from "../components/ClientsByDistrictChart";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProductsRequest();
        const tasksData = await getTasksRequest();
        const clientsData = await getClientsRequest();
        setProducts(productsData);
        setTasks(tasksData);
        setClients(clientsData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalProducts = products.length;
  const totalTasksPending = tasks.filter(task => task.estado === "pendiente").length;
  const totalClients = clients.length;
  const totalInventoryValue = products.reduce((sum, product) => sum + product.price, 0);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4 bg-light">
      <Sidebar />
      <h2 className="mb-4 fw-bold">Dashboard</h2>

      <Row className="g-4 mb-4">
        <Col xs={12} sm={6} md={3}>
          <Card className="shadow-lg border-0 h-100 rounded-4">
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <div className="mb-3 text-primary">
                <FontAwesomeIcon icon={faUsers} size="3x" />
              </div>
              <div>
                <Card.Subtitle className="text-muted mb-1">Total de Clientes</Card.Subtitle>
                <Card.Title className="h3 mb-0">{totalClients}</Card.Title>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="shadow-lg border-0 h-100 rounded-4">
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <div className="mb-3 text-success">
                <FontAwesomeIcon icon={faBox} size="3x" />
              </div>
              <div>
                <Card.Subtitle className="text-muted mb-1">Total de Productos</Card.Subtitle>
                <Card.Title className="h3 mb-0">{totalProducts}</Card.Title>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="shadow-lg border-0 h-100 rounded-4">
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <div className="mb-3 text-warning">
                <FontAwesomeIcon icon={faTasks} size="3x" />
              </div>
              <div>
                <Card.Subtitle className="text-muted mb-1">Tareas Pendientes</Card.Subtitle>
                <Card.Title className="h3 mb-0">{totalTasksPending}</Card.Title>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="shadow-lg border-0 h-100 rounded-4">
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <div className="mb-3 text-info">
                <FontAwesomeIcon icon={faChartLine} size="3x" />
              </div>
              <div>
                <Card.Subtitle className="text-muted mb-1">Valor Total del Inventario</Card.Subtitle>
                <Card.Title className="h3 mb-0">S/ {totalInventoryValue.toFixed(2)}</Card.Title>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col xs={12} md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="mb-3 text-primary">Stock de Productos</Card.Title>
              <div style={{ height: 250 }}>
                <ProductsChart data={products} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="mb-3 text-primary">Estado de las Tareas</Card.Title>
              <div style={{ height: 250 }}>
                <TasksChart tasks={tasks} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="mb-3 text-primary">Categoría de Productos</Card.Title>
              <div style={{ height: 250 }}>
                <CategoryChart products={products} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="mb-3 text-primary">Clientes por Distrito</Card.Title>
              <div style={{ height: 250 }}>
                <ClientsByDistrictChart clients={clients} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
