// Types pour les paramètres de requête et les filtres API

export interface QueryParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}

export interface ListResponse<T> {
  data: T[];
  total?: number;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Types pour les graphiques
export interface ChartDataItem {
  name: string;
  value: number;
  percentage: number;
  toolsCount: number;
  usersCount: number;
}
