export const analyticsKeys = {
  all: ["analytics"] as const,
  overview: () => [...analyticsKeys.all, "overview"] as const,
  expensiveTools: (params?: { limit?: number; min_cost?: number }) =>
    [...analyticsKeys.all, "expensive-tools", params] as const,
  departmentCosts: (params?: {
    sort_by?:
      | "total_cost"
      | "tools_count"
      | "total_users"
      | "average_cost_per_tool"
      | "cost_percentage";
    order?: "asc" | "desc";
  }) => [...analyticsKeys.all, "department-costs", params] as const,
};
