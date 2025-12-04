import { apiClient } from "../utils/api-client";
import { API_ENDPOINTS } from "../config/api";
import type { Analytics } from "../types/entities";
// TODO: Décommenter quand l'endpoint GET /api/analytics/department-costs sera disponible
// import type {
//   DepartmentCostsResponse,
//   DepartmentCostsQueryParams,
// } from "../types/api/department_costs";

export const analyticsService = {
  async getAll(): Promise<Analytics> {
    return apiClient.get<Analytics>(API_ENDPOINTS.analytics);
  },
  // TODO: Décommenter quand l'endpoint GET /api/analytics/department-costs sera disponible
  // async getDepartmentCosts(
  //   params?: DepartmentCostsQueryParams
  // ): Promise<DepartmentCostsResponse> {
  //   const queryParams = new URLSearchParams();
  //   if (params?.sort_by) {
  //     queryParams.append("sort_by", params.sort_by);
  //   }
  //   if (params?.order) {
  //     queryParams.append("order", params.order);
  //   }
  //   const queryString = queryParams.toString();
  //   const url = `${API_ENDPOINTS.analytics}/department-costs${
  //     queryString ? `?${queryString}` : ""
  //   }`;
  //   return apiClient.get<DepartmentCostsResponse>(url);
  // },
};
