import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TopProducts() {
  const data = {
    labels: ["Basic Tees", "Custom Short Pants", "Super Hoodies"],
    datasets: [
      {
        data: [55, 31, 14],
        backgroundColor: ["#98d79e", "#f7d870", "#ed8587"], // green, yellow, red
        borderWidth: 0,
        cutout: "70%", // makes it donut
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-1 pl-5 flex flex-col md:flex-row items-center gap-6 w-143">
      <div className="flex flex-col mr-10">
        <h1 className="text-1xl font-bold ml-3 ">Top Products</h1>
        {/* Left: Chart */}
        <div className="w-30 h-30 p-1 mt-1">
          <Doughnut data={data} options={options} />
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-sm font-semibold text-gray-300 mb-3 right-0">
          May-June 2021
        </h2>

        {/* Right: Legend */}
        <div className="flex flex-col gap-3 text-s">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#98d79e]"></span>
            <div>
              <p className="font-semibold text-sm">Basic Tees</p>
              <p className="text-gray-500 text-xs">55%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f7d870]"></span>
            <div>
              <p className="font-semibold text-sm">Custom Short Pants</p>
              <p className="text-gray-500 text-xs">31%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ed8587]"></span>
            <div>
              <p className="font-semibold text-sm">Super Hoodies</p>
              <p className="text-gray-500 text-xs">14%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

