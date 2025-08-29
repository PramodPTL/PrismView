import React from "react";
import { Plus } from "lucide-react";


export default function AddProfile() {

  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col items-center justify-center p-6 w-143 h-40 ml-5 mr-5 gap-6 cursor-pointer hover:shadow-lg transition max-w-5xl ">
      {/* Plus Icon */}
      <div className="w-15 h-15 flex items-center justify-center rounded-full border border-gray-100 text-gray-400 bg-gray-100">
        <Plus size={40} />
      </div>

      {/* Text */}
      <p className="mt-3 text-sm text-gray-500 font-medium">Add Profile</p>
    </div>
  );
}
