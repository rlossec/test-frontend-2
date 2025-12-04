import type { ExpensiveTool } from "../../../types/api/expensive_tools";
import { Paper } from "../../common/base/Paper";
import { ChartPlaceholder } from "../../common/charts/ChartPlaceholder";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getGradientColor } from "../../../config/settings";
import { formatCurrency } from "../../../utils/string-utils";

export const TopExpensiveTools = ({ tools }: { tools: ExpensiveTool[] }) => {
  const chartData = [...tools]
    .sort((a, b) => b.monthly_cost - a.monthly_cost)
    .map((tool) => ({
      name: tool.name,
      cost: tool.monthly_cost,
      costPerUser: tool.cost_per_user,
      users: tool.active_users_count,
    }));

  return (
    <Paper className="flex flex-col gap-4">
      <h3 className="text-md font-semibold text-text-light">
        Top Expensive Tools
      </h3>
      {tools.length > 0 ? (
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="opacity-20"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                stroke="currentColor"
                className="text-xs"
                tick={{ fill: "currentColor", fontSize: 12 }}
                tickFormatter={(value) => {
                  if (value >= 1000) {
                    return `€${(value / 1000).toFixed(0)}k`;
                  }
                  return `€${value.toFixed(0)}`;
                }}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="currentColor"
                className="text-xs"
                tick={{ fill: "currentColor", fontSize: 12 }}
                width={90}
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
              <Bar dataKey="cost" radius={[0, 4, 4, 0]}>
                {chartData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getGradientColor(index, chartData.length)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <ChartPlaceholder
          title="Aucun outil coûteux trouvé"
          content="Les données seront affichées lorsqu'elles seront disponibles"
        />
      )}
    </Paper>
  );
};
