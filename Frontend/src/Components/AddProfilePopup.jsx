import { useState } from "react";

export default function AddProfilePopup({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Profile Data:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("basic")}
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === "basic"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Basic
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === "contact"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Contact
          </button>
        </div>

        {/* Form Content */}
        {activeTab === "basic" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Enter Name*</label>
              <input
                type="text"
                name="name"
                placeholder="Eg. John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Enter Email*</label>
              <input
                type="email"
                name="email"
                placeholder="Eg. John@xyz.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Enter Phone*</label>
              <input
                type="text"
                name="phone"
                placeholder="Eg. 9123456789"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab("contact")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Enter Address*
              </label>
              <input
                type="text"
                name="address"
                placeholder="Eg. 123 Main St"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Enter City*</label>
              <input
                type="text"
                name="city"
                placeholder="Eg. New York"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setActiveTab("basic")}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
