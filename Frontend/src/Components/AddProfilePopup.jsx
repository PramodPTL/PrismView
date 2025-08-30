import { useState } from "react";
import { createProfile } from "../services/api";

export default function AddProfilePopup({ isOpen, onClose, onProfileCreated }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    youtube: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
        setError("Name, email, and phone are required fields");
        return;
      }

      // Create profile
      const response = await createProfile(formData);
      
      if (response.success) {
        // Reset form and close popup
        setFormData({
          name: "",
          email: "",
          phone: "",
          instagram: "",
          youtube: "",
        });
        setActiveTab("basic");
        onClose();
        
        // Notify parent component to refresh profiles list
        if (onProfileCreated) {
          onProfileCreated();
        }
        
        // You can add a success notification here
        alert("Profile created successfully!");
      }
    } catch (error) {
      setError(error.message || "Failed to create profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl  shadow-lg w-full max-w-lg p-6">
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

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

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
                required
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
                required
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
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab("contact")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                disabled={!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()}
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
                Instagram Link <span className="text-gray-300">(Optional)</span>
              </label>
              <input
                type="text"
                name="instagram"
                placeholder="Eg...instagram.com/username"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Youtube Link <span className="text-gray-300">(Optional)</span>
              </label>
              <input
                type="text"
                name="youtube"
                placeholder="Eg...youtube/username"
                value={formData.youtube}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveTab("basic")}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                disabled={isLoading}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
