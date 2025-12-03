import axiosInstance from "./axios-instance";
import type { QueryParams } from "../types/api/common";
import { handleAxiosError } from "./api-error";

export const apiClient = {
  async get<T>(endpoint: string, params?: QueryParams): Promise<T> {
    try {
      const response = await axiosInstance.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      const response = await axiosInstance.post<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      const response = await axiosInstance.put<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      const response = await axiosInstance.patch<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await axiosInstance.delete<T>(endpoint);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
