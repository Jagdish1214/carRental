import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // ⭐ sends JSESSIONID cookie
});

export default api;
