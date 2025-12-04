import type { BudgetOverview } from "../../../types/entities";
import { Paper } from "../../common/base/Paper";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS } from "../../../config/settings";
import { formatCurrency } from "../../../utils/string-utils";

export const MonthlySpendEvolution = ({
  budgetOverview,
}: {
  budgetOverview: BudgetOverview;
}) => {
  const now = new Date();
  const currentMonth = now.toLocaleDateString("fr-FR", { month: "short" });
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthName = previousMonth.toLocaleDateString("fr-FR", {
    month: "short",
  });

  const chartData = [
    {
      month: previousMonthName,
      spends: budgetOverview.previous_month_total,
      limit: budgetOverview.monthly_limit,
    },
    {
      month: currentMonth,
      spends: budgetOverview.current_month_total,
      limit: budgetOverview.monthly_limit,
    },
  ];

  return (
    <Paper className="flex flex-col gap-2">
      <h3 className="text-md font-semibold text-text-light">
        Monthly Spend Evolution
      </h3>
      <div className="w-full h-64 my-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="opacity-20"
            />
            <XAxis
              dataKey="month"
              stroke="currentColor"
              className="text-xs"
              tick={{ fill: "currentColor", fontSize: 12 }}
            />
            <YAxis
              stroke="currentColor"
              className="text-xs"
              tick={{ fill: "currentColor", fontSize: 12 }}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value: number) => formatCurrency(value)}
              labelStyle={{
                color: "#fff",
                fontWeight: "600",
                marginBottom: "8px",
              }}
              itemStyle={{
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="limit"
              stroke={CHART_COLORS[5]}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4 }}
              name="Budget limit"
            />
            <Line
              type="monotone"
              dataKey="spends"
              stroke={CHART_COLORS[0]}
              strokeWidth={3}
              dot={{ r: 5, fill: CHART_COLORS[0] }}
              name="Spends"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: CHART_COLORS[0] }}
            ></div>
            <span className="text-text-light/70">Spends</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-0.5 border-t-2 border-dashed"
              style={{ borderColor: CHART_COLORS[5] }}
            ></div>
            <span className="text-text-light/70">Budget limit</span>
          </div>
        </div>
      </div>
    </Paper>
  );
};
