import type {
  ExpensiveToolsResponse,
  ExpensiveToolsQueryParams,
  ExpensiveTool,
} from "../types/api/expensive_tools";

// Données mockées
const mockExpensiveToolsData = [
  {
    id: 15,
    name: "Slack",
    monthly_cost: 199.99,
    active_users_count: 12,
    cost_per_user: 16.67,
    department: "Sales",
    vendor: "BigCorp",
    efficiency_rating: "low",
  },
  {
    id: 8,
    name: "Figma",
    monthly_cost: 149.99,
    active_users_count: 8,
    cost_per_user: 18.75,
    department: "Design",
    vendor: "DesignPro",
    efficiency_rating: "medium",
  },
  {
    id: 22,
    name: "Notion",
    monthly_cost: 299.99,
    active_users_count: 15,
    cost_per_user: 20.0,
    department: "Engineering",
    vendor: "DataCorp",
    efficiency_rating: "high" as const,
  },
  {
    id: 5,
    name: "Zoom",
    monthly_cost: 89.99,
    active_users_count: 10,
    cost_per_user: 9.0,
    department: "Marketing",
    vendor: "MarketTech",
    efficiency_rating: "medium",
  },
  {
    id: 12,
    name: "Microsoft Teams",
    monthly_cost: 179.99,
    active_users_count: 6,
    cost_per_user: 30.0,
    department: "HR",
    vendor: "HRSoft",
    efficiency_rating: "low",
  },
  {
    id: 18,
    name: "Salesforce",
    monthly_cost: 249.99,
    active_users_count: 9,
    cost_per_user: 27.78,
    department: "Finance",
    vendor: "FinancePro",
    efficiency_rating: "high",
  },
  {
    id: 3,
    name: "Jira",
    monthly_cost: 129.99,
    active_users_count: 20,
    cost_per_user: 6.5,
    department: "Operations",
    vendor: "ProjectCorp",
    efficiency_rating: "high",
  },
  {
    id: 25,
    name: "Notion",
    monthly_cost: 99.99,
    active_users_count: 25,
    cost_per_user: 4.0,
    department: "Engineering",
    vendor: "CommTech",
    efficiency_rating: "medium",
  },
  {
    id: 7,
    name: "Datadog",
    monthly_cost: 349.99,
    active_users_count: 5,
    cost_per_user: 70.0,
    department: "Engineering",
    vendor: "DataBase Inc",
    efficiency_rating: "low",
  },
  {
    id: 14,
    name: "Zendesk",
    monthly_cost: 79.99,
    active_users_count: 14,
    cost_per_user: 5.71,
    department: "Sales",
    vendor: "SupportTech",
    efficiency_rating: "medium",
  },
  {
    id: 9,
    name: "Crowdstrike",
    monthly_cost: 219.99,
    active_users_count: 7,
    cost_per_user: 31.43,
    department: "Operations",
    vendor: "SecureCorp",
    efficiency_rating: "high",
  },
  {
    id: 20,
    name: "Aircall",
    monthly_cost: 69.99,
    active_users_count: 11,
    cost_per_user: 6.36,
    department: "Marketing",
    vendor: "ContentPro",
    efficiency_rating: "medium",
  },
  {
    id: 11,
    name: "Salesforce",
    monthly_cost: 279.99,
    active_users_count: 8,
    cost_per_user: 35.0,
    department: "Finance",
    vendor: "BICorp",
    efficiency_rating: "high",
  },
  {
    id: 16,
    name: "Greenhouse",
    monthly_cost: 159.99,
    active_users_count: 4,
    cost_per_user: 40.0,
    department: "HR",
    vendor: "RecruitTech",
    efficiency_rating: "low",
  },
  {
    id: 4,
    name: "GitLab",
    monthly_cost: 189.99,
    active_users_count: 18,
    cost_per_user: 10.56,
    department: "Engineering",
    vendor: "CodeCorp",
    efficiency_rating: "high",
  },
  {
    id: 19,
    name: "Mailchimp",
    monthly_cost: 59.99,
    active_users_count: 13,
    cost_per_user: 4.61,
    department: "Marketing",
    vendor: "EmailTech",
    efficiency_rating: "medium",
  },
  {
    id: 6,
    name: "Xero",
    monthly_cost: 139.99,
    active_users_count: 6,
    cost_per_user: 23.33,
    department: "Finance",
    vendor: "AccountPro",
    efficiency_rating: "medium",
  },
  {
    id: 21,
    name: "Datadog",
    monthly_cost: 259.99,
    active_users_count: 3,
    cost_per_user: 86.66,
    department: "Operations",
    vendor: "InfraCorp",
    efficiency_rating: "high",
  },
];

const mockAnalysis = {
  total_tools_analyzed: 18,
  avg_cost_per_user_company: 12.45,
  potential_savings_identified: 345.5,
};

export function mockExpensiveTools(
  params?: ExpensiveToolsQueryParams
): ExpensiveToolsResponse {
  let data = [...mockExpensiveToolsData];

  // Filtrage par coût minimum si spécifié
  if (params?.min_cost !== undefined) {
    data = data.filter((tool) => tool.monthly_cost >= params.min_cost!);
  }

  // Tri par coût décroissant (les plus chers en premier)
  data.sort((a, b) => b.monthly_cost - a.monthly_cost);

  // Limitation du nombre de résultats si spécifié
  if (params?.limit !== undefined) {
    data = data.slice(0, params.limit);
  }

  // Mise à jour de l'analyse avec le nombre réel d'outils analysés
  const analysis = {
    ...mockAnalysis,
    total_tools_analyzed: mockExpensiveToolsData.length,
  };

  return {
    data: data as ExpensiveTool[],
    analysis,
  };
}
