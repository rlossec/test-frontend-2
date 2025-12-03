import axios, { type AxiosInstance, type AxiosError } from "axios";
import { API_BASE_URL, API_CONFIG } from "../config/api";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur de requête pour le logging en développement
axiosInstance.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
        {
          params: config.params,
          data: config.data,
        }
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour le logging et la gestion des erreurs
axiosInstance.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(
        `[API Response] ${response.config.method?.toUpperCase()} ${
          response.config.url
        }`,
        {
          status: response.status,
          data: response.data,
        }
      );
    }

    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      const status = error.response.status;
      const data = error.response.data as { message?: string } | undefined;

      if (import.meta.env.DEV) {
        console.error(
          `[API Error] ${error.config?.method?.toUpperCase()} ${
            error.config?.url
          }`,
          {
            status,
            message: data?.message || error.message,
          }
        );
      }
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.error("[API Error] No response received", error.request);
    } else {
      // Une erreur s'est produite lors de la configuration de la requête
      console.error("[API Error] Request setup error", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
