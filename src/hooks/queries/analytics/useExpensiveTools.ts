import { useQuery } from "@tanstack/react-query";
import { mockExpensiveTools } from "../../../mock/expensive-tools.mock";
import type { ExpensiveToolsQueryParams } from "../../../types/api/expensive_tools";
import { analyticsKeys } from "./analytics-keys";

export function useExpensiveTools(params?: ExpensiveToolsQueryParams) {
  return useQuery({
    queryKey: analyticsKeys.expensiveTools(params),
    queryFn: () => {
      return mockExpensiveTools(params);
      // TODO: Remplacer par l'appel au service quand l'endpoint sera disponible
      // return analyticsService.getExpensiveTools(params);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
