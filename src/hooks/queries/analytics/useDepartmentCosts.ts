import { useQuery } from "@tanstack/react-query";
import { mockDepartmentCosts } from "../../../mock/department-costs.mock";
import type { DepartmentCostsQueryParams } from "../../../types/api/department_costs";
import { analyticsKeys } from "./analytics-keys";

// import { analyticsService } from "../../../services/analytics.service";

export function useDepartmentCosts(params?: DepartmentCostsQueryParams) {
  return useQuery({
    queryKey: analyticsKeys.departmentCosts(params),
    queryFn: () => {
      // Utilisation du mock en attendant l'endpoint GET /api/analytics/department-costs
      return mockDepartmentCosts(params);
      // TODO: Remplacer par l'appel au service quand l'endpoint sera disponible
      // return analyticsService.getDepartmentCosts(params);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
