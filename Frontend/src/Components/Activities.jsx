import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Activities = () => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Guest",
        data: [500, 380, 200, 400],
        backgroundColor: "#98d79e",
        barThickness: 30,
        borderRadius: 5,
        categoryPercentage: 0.6, // reduce to add space
        barPercentage: 0.8,
      },
      {
        label: "User",
        data: [400, 430, 300, 320],
        backgroundColor: "#ed8587",
        barThickness: 30,
        borderRadius: 5,
        categoryPercentage: 0.6, // reduce to add space
        barPercentage: 0.8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2.5, // Increase this value to make it wider and shorter
    plugins: {
      legend: {
        position: "top",
        align: "end", // moves legend to top right
        labels: {
          color: "#333",
          font: {
            size: 10,
          },
          boxWidth: 12,
          boxHeight: 12,
          borderRadius: 8, // makes the legend color box rounded
          useBorderRadius: true, // Chart.js v4+ supports this
          padding: 6,
        },
      },
      title: {
        display: true,
        text: "Activities",
        font: {
          size: 20,
        },
        color: "#111",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 500,
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div className="w-300 h-80 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-1">Activities</h1>
      <h2 className="text-lg font-semibold text-gray-300 mb-2">
        May-June 2021
      </h2>
      <div className="w-full h-54">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Activities;
