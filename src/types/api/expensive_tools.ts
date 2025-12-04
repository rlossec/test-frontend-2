export interface ExpensiveTool {
  id: number;
  name: string;
  monthly_cost: number;
  active_users_count: number;
  cost_per_user: number;
  department: string;
  vendor: string;
  efficiency_rating: "low" | "medium" | "high";
}

export interface ExpensiveToolsAnalysis {
  total_tools_analyzed: number;
  avg_cost_per_user_company: number;
  potential_savings_identified: number;
}

export interface ExpensiveToolsResponse {
  data: ExpensiveTool[];
  analysis: ExpensiveToolsAnalysis;
}

export interface ExpensiveToolsQueryParams {
  limit?: number;
  min_cost?: number;
}
