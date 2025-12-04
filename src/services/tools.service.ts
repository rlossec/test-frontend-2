import { API_ENDPOINTS } from "../config/api";
import { apiClient } from "../utils/api-client";

import type { Tool } from "../types/entities";
import type { ListToolsQueryParams } from "../types/api/list_tools";

export type CreateToolForm = Omit<
  Tool,
  | "id"
  | "previous_month_cost"
  | "active_users_count"
  | "created_at"
  | "updated_at"
>;

export type UpdateToolForm = Partial<CreateToolForm>;

export const toolsService = {
  async getAll(params?: ListToolsQueryParams): Promise<Tool[]> {
    return apiClient.get<Tool[]>(API_ENDPOINTS.tools, params);
  },

  async getById(id: number): Promise<Tool> {
    return apiClient.get<Tool>(`${API_ENDPOINTS.tools}/${id}`);
  },

  async create(data: CreateToolForm): Promise<Tool> {
    return apiClient.post<Tool>(API_ENDPOINTS.tools, data);
  },

  async update(id: number, data: UpdateToolForm): Promise<Tool> {
    return apiClient.put<Tool>(`${API_ENDPOINTS.tools}/${id}`, data);
  },
};
