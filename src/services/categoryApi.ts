import { apiClient } from "../config/api";

export const categoryApi = {
  getAll: async () => {
    const response = await apiClient.get("/category/categories");
    return response.data;
  },

  create: async (categoryName: string) => {
    const response = await apiClient.post("/category/new/", { categoryName });
    return response.data;
  },

  update: async (categoryName: string, newCategoryName: string) => {
    const response = await apiClient.post(`/category/update/${categoryName}`, {
      categoryName: newCategoryName,
    });
    return response.data;
  },

  delete: async (categoryName: string) => {
    const response = await apiClient.delete(`/category/delete/${categoryName}`);
    return response.data;
  },
};