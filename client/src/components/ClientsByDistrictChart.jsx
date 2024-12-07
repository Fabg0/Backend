import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

// Registra los elementos necesarios para el gráfico
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Lista de todos los distritos de Lima
const LIMA_DISTRICTS = [
  "San Isidro", "Miraflores", "Surco", "Barranco", "San Borja", "La Molina", 
  "Lince", "Jesús María", "Pueblo Libre", "Magdalena", "San Miguel", 
  "Callao", "Los Olivos", "Comas", "Villa El Salvador", "Villa María del Triunfo",
  "Ate", "Chorrillos", "San Juan de Lurigancho", "San Juan de Miraflores",
];

function ClientsByDistrictChart({ clients }) {
  // Cuenta clientes por distrito
  const districtCounts = LIMA_DISTRICTS.map((district) => {
    const count = clients.filter((client) => client.district === district).length;
    return count;
  });

  // Datos para el gráfico
  const chartData = {
    labels: LIMA_DISTRICTS, // Nombres de los distritos
    datasets: [
      {
        label: "Cantidad de Clientes",
        data: districtCounts, // Cantidades por distrito
        borderColor: "rgba(54, 162, 235, 0.7)", // Color más suave
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Fondo transparente
        borderWidth: 2,
        pointRadius: 3, // Tamaño de puntos más pequeño
        pointBackgroundColor: "rgba(54, 162, 235, 0.7)",
        tension: 0.3, // Línea menos curvada
      },
    ],
  };

  // Opciones del gráfico
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Importante para ajustar al contenedor
    plugins: {
      legend: {
        display: false, // Ocultar leyenda para ahorrar espacio
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        ticks: {
          rotation: -45, // Rotar etiquetas para evitar superposición
          font: {
            size: 8 // Reducir tamaño de fuente de etiquetas
          },
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false // Ocultar líneas de cuadrícula
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10 // Tamaño de fuente más pequeño
          }
        },
        grid: {
          color: 'rgba(0,0,0,0.1)' // Líneas de cuadrícula más sutiles
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default ClientsByDistrictChart;