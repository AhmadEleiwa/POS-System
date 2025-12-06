import { apiClient } from "../config/api";

export const unitApi = {
  getAll: async () => {
    const response = await apiClient.get("/unit/units");
    return response.data;
  },

  create: async (data: {
    unitOfMeasureName: string;
    baseUnitOfMeasure: string;
    conversionFactor: number;
  }) => {
    const response = await apiClient.post("/unit/new", data);
    return response.data;
  },

  update: async (
    unitName: string,
    data: {
      unitOfMeasureName: string;
      baseUnitOfMeasure: string;
      conversionFactor: number;
    }
  ) => {
    const response = await apiClient.post(`/unit/update/${unitName}`, data);
    return response.data;
  },

  delete: async (unitName: string) => {
    const response = await apiClient.delete(`/unit/delete/${unitName}`);
    return response.data;
  },
};