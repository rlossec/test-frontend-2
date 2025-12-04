export interface DepartmentCost {
  department: string;
  total_cost: number;
  tools_count: number;
  total_users: number;
  average_cost_per_tool: number;
  cost_percentage: number;
}

export interface DepartmentCostsSummary {
  total_company_cost: number;
  departments_count: number;
  most_expensive_department: string;
}

export interface DepartmentCostsResponse {
  data: DepartmentCost[];
  summary: DepartmentCostsSummary;
}

export interface DepartmentCostsQueryParams {
  sort_by?:
    | "total_cost"
    | "tools_count"
    | "total_users"
    | "average_cost_per_tool"
    | "cost_percentage";
  order?: "asc" | "desc";
}
