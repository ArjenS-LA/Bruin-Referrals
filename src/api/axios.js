import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000",
});

// Refresher token to check for expired tokens
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
