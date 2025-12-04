import type { Analytics } from "../../types/entities";
import type { ExpensiveTool } from "../../types/api/expensive_tools";
import type { DepartmentCost } from "../../types/api/department_costs";

import { DepartmentCostBreakdown } from "./costs/DepartmentCostBreakdown ";
import { MonthlySpendEvolution } from "./costs/MonthlySpendEvolution";
import { TopExpensiveTools } from "./costs/TopExpensiveTools";
import { EuroIcon } from "../../icons/others/EuroIcon";
import { Paper } from "../common/base/Paper";
import { KPICard } from "../KPICard";
import { ArrowTrending } from "../../icons/state/ArrowTrending";

export const CostsAnalytics = ({
  analytics,
  expensiveTools,
  departmentCosts,
}: {
  analytics: Analytics;
  expensiveTools: ExpensiveTool[];
  departmentCosts: DepartmentCost[];
}) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <EuroIcon className="w-6 h-6 text-text-light" />
        <h2 className="text-xl font-semibold text-text-light">
          Cost Analytics
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlySpendEvolution budgetOverview={analytics.budget_overview} />
        <DepartmentCostBreakdown departmentCosts={departmentCosts || []} />
        <TopExpensiveTools tools={expensiveTools || []} />
        <Paper>
          <KPICard
            title="Budget Progress"
            icon={<ArrowTrending className="w-5 h-5" />}
            value={`€${analytics.budget_overview.current_month_total.toLocaleString()}`}
            overValue={`€${analytics.budget_overview.monthly_limit.toLocaleString()}`}
            trend={analytics.kpi_trends.budget_change}
            color="bg-gradient-to-br from-emerald-300 to-teal-600"
          />
        </Paper>
      </div>
    </section>
  );
};
