import React from "react";

const TopBox = () => {
  return (
    <div className="bg-white rounded-xl w-70  shadow p-2 pl-4 pr-5 flex items-center justify-between m-2">
      <div className="flex flex-col items-start w-full relative">
        {/* Icon at top right corner */}
        <div className="left-3n ">
          {/* New Total Revenue Icon: Bar Chart */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect
              x="3"
              y="13"
              width="3"
              height="8"
              rx="1"
              fill="#bbf7d0"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="9"
              y="9"
              width="3"
              height="12"
              rx="1"
              fill="#bbf7d0"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="15"
              y="5"
              width="3"
              height="16"
              rx="1"
              fill="#bbf7d0"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Total Revenues Label */}
        <span className="text-gray-500 text-sm mt-1">Total Revenues</span>
        {/* Money and Percentage */}
        <div className="flex items-center justify-between w-full mt-1">
          <span className="text-2xl font-bold text-gray-800">$2,129,430</span>
          <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded text-xs font-semibold ml-2">
            +2.5%
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBox;
