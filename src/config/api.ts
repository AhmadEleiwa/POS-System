import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5500";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const setAuthToken = (token: string) => {
  apiClient.defaults.headers.post.Authorization = `bearer ${token}`;
  apiClient.defaults.headers.delete.Authorization = `bearer ${token}`;
};