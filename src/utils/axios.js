import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_TMDB,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TMDB}`,
  },
});

export const axiosInstanceExpress = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_EXPRESS,
  headers: {
    "Content-Type": "application/json",
  },
});
