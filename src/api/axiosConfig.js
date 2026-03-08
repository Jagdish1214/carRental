import axios from "axios";

const api = axios.create({
  baseURL: "https://urbanrentals-backend-production.up.railway.app",
  withCredentials: true, // ⭐ sends JSESSIONID cookie
});

export default api;
