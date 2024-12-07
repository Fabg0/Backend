import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registra los elementos necesarios para el gráfico
ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({ products }) {
  // Cuenta la cantidad de productos por categoría
  const categoryCounts = products.reduce((acc, product) => {
    const category = product.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Crea los datos para el gráfico
  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        // Colores más suaves y pasteles
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',   // Azul suave
          'rgba(255, 206, 86, 0.5)',   // Amarillo suave
          'rgba(75, 192, 192, 0.5)',   // Verde azulado suave
          'rgba(255, 159, 64, 0.5)',   // Naranja suave
          'rgba(153, 102, 255, 0.5)',  // Púrpura suave
          'rgba(199, 199, 199, 0.5)'   // Gris suave
        ],
        // Colores de hover ligeramente más intensos
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(199, 199, 199, 0.7)'
        ],
      },
    ],
  };

  // Opciones para convertir el gráfico en un donut y hacerlo más compacto
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Importante para ajustar al contenedor
    plugins: {
      legend: {
        display: false, // Ocultar leyenda para ahorrar espacio
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw} productos`;
          },
        },
      },
    },
    cutout: '60%', // Efecto de donut
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}

export default CategoryChart;