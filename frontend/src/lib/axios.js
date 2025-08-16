import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "https://airline1-pwj5.onrender.com/api",
  withCredentials: true // IMPORTANT for cookies
});
