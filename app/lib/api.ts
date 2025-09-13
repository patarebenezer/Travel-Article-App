import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
 baseURL: API_URL,
});

api.interceptors.request.use((config) => {
 if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
   console.log("Request Headers:", config.headers);
   config.headers.Authorization = `Bearer ${token}`;
  }
 }
 return config;
});
