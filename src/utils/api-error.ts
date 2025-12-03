import axios, { type AxiosError } from "axios";

export class ApiError extends Error {
  public status?: number;
  public code?: string;
  public data?: unknown;

  constructor(message: string, status?: number, code?: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

export function handleAxiosError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const status = axiosError.response?.status;
    const data = axiosError.response?.data;
    const message =
      data?.message ||
      axiosError.message ||
      `HTTP error! status: ${status || "unknown"}`;

    return new ApiError(message, status, axiosError.code, data);
  }

  return new ApiError(
    error instanceof Error ? error.message : "Network error occurred"
  );
}
