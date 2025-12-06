import { apiClient } from "../config/api";

export const cartApi = {
  getAll: async () => {
    const response = await apiClient.get("/cart/carts");
    return response.data;
  },
};

export const userApi = {
  getAll: async () => {
    const response = await apiClient.get("/user/users");
    return response.data;
  },

  create: async (data: {
    username: string;
    password: string;
    admin: boolean;
  }) => {
    const response = await apiClient.post("/user/create", data);
    return response.data;
  },

  delete: async (username: string) => {
    const response = await apiClient.delete(`/user/delete/${username}`);
    return response.data;
  },
};