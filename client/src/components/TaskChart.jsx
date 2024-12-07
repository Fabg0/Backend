import React from 'react';
import { Pie } from 'react-chartjs-2'; // Cambiamos de Bar a Pie
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registra los componentes de Chart.js necesarios para el gráfico de pastel
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const TasksChart = ({ tasks }) => {
  // Contadores de los estados de las tareas
  const taskStatuses = tasks.reduce(
    (acc, task) => {
      if (task.estado === 'pendiente') acc.pending++;
      if (task.estado === 'en progreso') acc.inProgress++;
      if (task.estado === 'completado') acc.completed++;
      return acc;
    },
    { pending: 0, inProgress: 0, completed: 0 }
  );

  // Datos del gráfico de pastel
  const data = {
    labels: ['Pendiente', 'En progreso', 'Completado'],
    datasets: [
      {
        label: 'Tareas por Estado',
        data: [taskStatuses.pending, taskStatuses.inProgress, taskStatuses.completed],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Rosa translúcido
          'rgba(54, 162, 235, 0.5)', // Azul translúcido
          'rgba(255, 206, 86, 0.5)', // Amarillo translúcido
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Borde más tenue
        borderWidth: 1, // Líneas del borde más sutiles
      },
    ],
  };

  // Opciones adicionales para personalizar el gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite mayor flexibilidad en tamaño
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12, // Tamaño de fuente reducido
          },
          color: '#666', // Color de texto más suave
        },
      },
      title: {
        display: true,
        text: 'Distribución de Tareas por Estado',
        font: {
          size: 16, // Tamaño de título reducido
        },
        color: '#333', // Tono de texto moderado
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '400px', margin: 'auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default TasksChart;
