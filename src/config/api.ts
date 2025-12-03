// Configuration de l'API

export const API_BASE_URL = "https://tt-jsonserver-01.alt-tools.tech";

export const API_ENDPOINTS = {
  departments: "/departments",
  users: "/users",
  tools: "/tools",
  userTools: "/user_tools",
  analytics: "/analytics",
} as const;

export const API_CONFIG = {
  timeout: 10000, // 10 secondes
  retryAttempts: 3,
  retryDelay: 1000, // 1 seconde
} as const;
