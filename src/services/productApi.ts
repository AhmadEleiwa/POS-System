import { apiClient } from "../config/api";

export const productApi = {
  getAll: async () => {
    const response = await apiClient.get("/product/products");
    return response.data;
  },

  create: async (formData: FormData) => {
    const response = await apiClient.post("/product/new", formData);
    return response.data;
  },

  update: async (productId: string, formData: FormData) => {
    const response = await apiClient.post(`/product/update/${productId}`, formData);
    return response.data;
  },

  delete: async (productId: string) => {
    const response = await apiClient.delete(`/product/delete/${productId}`);
    return response.data;
  },
};