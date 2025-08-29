import React, { useState, useEffect } from "react";
import { apiService } from "../services/api";

const BackendTest = () => {
  const [status, setStatus] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getStatus();
      setStatus(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getUsers();
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Test connection on component mount
    testConnection();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Backend Connection Test
      </h2>

      {/* Status Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Connection Status
        </h3>
        {status ? (
          <div className="p-3 bg-green-100 border border-green-300 rounded-md">
            <p className="text-green-800">
              <strong>✓ Connected!</strong> {status.message}
            </p>
            <p className="text-sm text-green-600 mt-1">
              Timestamp: {new Date(status.timestamp).toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-md">
            <p className="text-yellow-800">Checking connection...</p>
          </div>
        )}
        <button
          onClick={testConnection}
          disabled={loading}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Connection"}
        </button>
      </div>

      {/* Users Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Sample Users
        </h3>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="mb-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Fetch Users"}
        </button>

        {users.length > 0 && (
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-3 bg-gray-50 border border-gray-200 rounded-md"
              >
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-300 rounded-md">
          <p className="text-red-800">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default BackendTest;
