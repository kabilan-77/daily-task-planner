import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default API;
