import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskRequest, updateTasksRequest } from "../api/tasks";  // Asegúrate de tener los endpoints correctos

const UpdateTask = () => {
  const { id } = useParams(); // ID de la tarea desde la URL
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    estado: "pendiente",  // Puedes establecer el estado por defecto como 'pendiente'
  });
  const [loading, setLoading] = useState(true); // Estado para saber si está cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true); // Inicia carga
        const response = await getTaskRequest(id); // Obtén datos de la tarea
        setTask(response); // Actualiza estado de la tarea
      } catch (err) {
        console.error("Error al obtener la tarea:", err);
        setError("Tarea no encontrada o error al cargar datos."); // Guarda el mensaje de error
      } finally {
        setLoading(false); // Finaliza carga
      }
    };

    if (id) fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: value, // Actualiza el estado de la tarea
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de datos
    if (!task.title || !task.description || !task.estado) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      // Actualiza la tarea en la API
      await updateTasksRequest({ ...task, _id: id }); // Asegura que incluimos el ID
      alert("Tarea actualizada correctamente.");
      navigate("/tasks"); // Redirige después de guardar
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      alert("No se pudo actualizar la tarea.");
    }
  };

  // Renderiza mientras carga o si hay error
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título de la tarea</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción de la tarea</label>
          <input
            type="text"
            name="description"
            id="description"
            className="form-control"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="estado" className="form-label">Estado</label>
          <select
            name="estado"
            id="estado"
            className="form-control"
            value={task.estado}
            onChange={handleChange}
            required
          >
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En progreso</option>
            <option value="completado">Completado</option>
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn px-5"
            style={{
              backgroundColor: "#73816E",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
            }}
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
