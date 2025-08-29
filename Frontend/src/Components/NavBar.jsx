import React from "react";

const NavBar = () => {
  return (
    <div className="h-screen w-64 m-5 bg-[#4285f6] text-white flex flex-col justify-between shadow-lg rounded-xl">
      {/* Top Section */}
      <div>
        <div className="p-6 text-2xl text-center mt-5 font-bold border-blue-500">PRISMVIEW</div>
        <nav className="flex flex-col p-4 gap-4">
          <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-blue-600 transition">
            <span>
              {/* Dashboard Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="2" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="2" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" rx="2" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="2" strokeWidth="2" />
              </svg>
            </span>
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-blue-600 transition">
            <span>
              {/* Transaction Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17 9V7a5 5 0 00-10 0v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="2"/>
                <path d="M12 17v-2" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            Transaction
          </a>
          <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-blue-600 transition">
            <span>
              {/* Schedules Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2"/>
                <path d="M16 3v4" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 3v4" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 9h18" strokeWidth="2"/>
              </svg>
            </span>
            Schedules
          </a>
          <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-blue-600 transition">
            <span>
              {/* Users Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="9" cy="7" r="4" strokeWidth="2"/>
                <path d="M17 11c1.656 0 3 1.343 3 3v3" strokeWidth="2"/>
                <path d="M2 17v-3c0-1.657 1.343-3 3-3h4" strokeWidth="2"/>
                <circle cx="17" cy="7" r="4" strokeWidth="2"/>
              </svg>
            </span>
            Users
          </a>
          <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-blue-600 transition">
            <span>
              {/* Settings Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09A1.65 1.65 0 008.91 3H9a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth="2"/>
              </svg>
            </span>
            Settings
          </a>
        </nav>
      </div>
      {/* Bottom Section */}
      <div className="flex flex-col items-start px-6 py-10 text-sm gap-1">
        <a href="#" className="m-3 hover:underline text-gray-200 hover:text-white transition">Help</a>
        <a href="#" className="m-3 hover:underline text-gray-200 hover:text-white transition">Contact Us</a>
      </div>
    </div>
  );
};

export default NavBar;
