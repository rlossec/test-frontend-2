import type {
  DepartmentCostsResponse,
  DepartmentCostsQueryParams,
} from "../types/api/department_costs";

// Données mockées de base
const mockDepartmentCostsData = [
  {
    department: "Engineering",
    total_cost: 890.5,
    tools_count: 12,
    total_users: 45,
    average_cost_per_tool: 74.21,
    cost_percentage: 36.2,
  },
  {
    department: "Sales",
    total_cost: 456.75,
    tools_count: 6,
    total_users: 18,
    average_cost_per_tool: 76.13,
    cost_percentage: 18.6,
  },
  {
    department: "Marketing",
    total_cost: 320.4,
    tools_count: 8,
    total_users: 22,
    average_cost_per_tool: 40.05,
    cost_percentage: 13.1,
  },
  {
    department: "HR",
    total_cost: 245.3,
    tools_count: 4,
    total_users: 12,
    average_cost_per_tool: 61.33,
    cost_percentage: 10.0,
  },
  {
    department: "Finance",
    total_cost: 398.6,
    tools_count: 5,
    total_users: 15,
    average_cost_per_tool: 79.72,
    cost_percentage: 16.2,
  },
  {
    department: "Operations",
    total_cost: 139.25,
    tools_count: 3,
    total_users: 8,
    average_cost_per_tool: 46.42,
    cost_percentage: 5.7,
  },
];

const mockSummary = {
  total_company_cost: 2450.8,
  departments_count: 6,
  most_expensive_department: "Engineering",
};

export function mockDepartmentCosts(
  params?: DepartmentCostsQueryParams
): DepartmentCostsResponse {
  const data = [...mockDepartmentCostsData];

  // Application du tri si spécifié
  if (params?.sort_by) {
    const sortBy = params.sort_by;
    const order = params.order || "asc";

    data.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "total_cost":
          comparison = a.total_cost - b.total_cost;
          break;
        case "tools_count":
          comparison = a.tools_count - b.tools_count;
          break;
        case "total_users":
          comparison = a.total_users - b.total_users;
          break;
        case "average_cost_per_tool":
          comparison = a.average_cost_per_tool - b.average_cost_per_tool;
          break;
        case "cost_percentage":
          comparison = a.cost_percentage - b.cost_percentage;
          break;
      }

      return order === "desc" ? -comparison : comparison;
    });
  }

  return {
    data,
    summary: mockSummary,
  };
}
