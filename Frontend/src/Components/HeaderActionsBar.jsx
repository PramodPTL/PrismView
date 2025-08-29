import React from "react";

const HeaderActionsBar = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>


      {/* Bell Icon */}
      <button className="relative p-2 rounded-full hover:bg-gray-200 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Notification Dot */}
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
      </button>
      {/* Profile Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-2 focus:outline-none">
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-9 h-9 rounded-full border-2 border-blue-400"
          />
        </button>
      </div>
    </div>
  );
};

export default HeaderActionsBar;
