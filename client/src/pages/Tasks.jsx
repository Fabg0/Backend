import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasksRequest, deleteTasksRequest } from "../api/tasks";
import { Button, Card, Col, Row, Badge, Spinner, Modal, Alert } from "react-bootstrap";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  // Estado color mapping
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'activo':
        return 'success';
      case 'pendiente':
        return 'warning';
      case 'completado':
        return 'primary';
      case 'cancelado':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
    
      try {
        const data = await getTasksRequest(token);
        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
        setError('No se pudieron cargar los proyectos. Intente nuevamente.');
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);
  
  const handleDeleteConfirm = async () => {
    if (taskToDelete) {
      try {
        await deleteTasksRequest(taskToDelete);
        const updatedTasks = tasks.filter((task) => task._id !== taskToDelete);
        setTasks(updatedTasks);
        setSuccessMessage('Proyecto eliminado exitosamente');
        setTaskToDelete(null);
        
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } catch (error) {
        console.log("Error al eliminar tarea:", error);
        setDeleteError('No se pudo eliminar el proyecto');
        
        setTimeout(() => {
          setDeleteError(null);
        }, 3000);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <Alert variant="danger" className="text-center">
          <p>{error}</p>
          <Button 
            variant="outline-danger" 
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Reintentar
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {successMessage && (
        <Alert 
          variant="success" 
          onClose={() => setSuccessMessage(null)} 
          dismissible 
          className="text-center"
        >
          {successMessage}
        </Alert>
      )}

      {deleteError && (
        <Alert 
          variant="danger" 
          onClose={() => setDeleteError(null)} 
          dismissible 
          className="text-center"
        >
          {deleteError}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Lista de Proyectos de la empresa</h3>
        <Button variant="success" as={Link} to="/create-task">
          Agregar proyecto +
        </Button>
      </div>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {tasks.map((task) => (
          <Col key={task._id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    Fecha: {new Date(task.date).toLocaleDateString()}
                  </small>
                </Card.Text>
                <Badge bg={getStatusColor(task.estado)}>{task.estado}</Badge>
              </Card.Body>
              <Card.Footer className="bg-transparent d-flex justify-content-between">
                <Button 
                  variant="outline-primary" 
                  as={Link} 
                  to={`/update-task/${task._id}`} 
                  size="sm"
                  className="me-2"
                >
                  Editar
                </Button>
                <Button 
                  variant="outline-danger" 
                  onClick={() => setTaskToDelete(task._id)} 
                  size="sm"
                >
                  Eliminar
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Confirmation Modal */}
      <Modal show={!!taskToDelete} onHide={() => setTaskToDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar este proyecto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setTaskToDelete(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Tasks;