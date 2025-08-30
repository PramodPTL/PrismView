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

  // Profile methods
  getProfiles: () => api.get("/profiles"),
  getProfile: (id) => api.get(`/profiles/${id}`),
  createProfile: (profileData) => api.post("/profiles", profileData),
  updateProfile: (id, profileData) => api.put(`/profiles/${id}`, profileData),
  deleteProfile: (id) => api.delete(`/profiles/${id}`),

  // Add more API methods here as needed
};

// User authentication functions
export const signUpUser = async (userData) => {
  try {
    const response = await api.post("/users/signup", userData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Network error occurred");
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Network error occurred");
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Network error occurred");
  }
};

export const googleSignIn = async (accessToken) => {
  try {
    const response = await api.post("/users/google-signin", { accessToken });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Google authentication failed");
  }
};

// Profile management functions
export const createProfile = async (profileData) => {
  try {
    const response = await api.post("/profiles", profileData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to create profile");
  }
};

export const getProfiles = async () => {
  try {
    const response = await api.get("/profiles");
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to fetch profiles");
  }
};

export const updateProfile = async (id, profileData) => {
  try {
    const response = await api.put(`/profiles/${id}`, profileData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to update profile");
  }
};

export const deleteProfile = async (id) => {
  try {
    const response = await api.delete(`/profiles/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to delete profile");
  }
};

export default api;
