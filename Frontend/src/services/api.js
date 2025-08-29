import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "/api", // This will be proxied to http://localhost:5000/api
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// API methods
export const apiService = {
  // Test backend connection
  getStatus: () => api.get("/status"),

  // Get users
  getUsers: () => api.get("/users"),

  // Add more API methods here as needed
};

export default api;
