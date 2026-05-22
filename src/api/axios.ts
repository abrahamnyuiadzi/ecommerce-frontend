import axios from "axios";

const api = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: "https://ecommerce-api-8cx4.onrender.com"
});

// ajouter token automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;