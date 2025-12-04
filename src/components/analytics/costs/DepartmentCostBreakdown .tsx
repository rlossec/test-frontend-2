import type { DepartmentCost } from "../../../types/api/department_costs";
import type { ChartDataItem } from "../../../types/api/common";
import { Paper } from "../../common/base/Paper";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getChartColor } from "../../../config/settings";
import { DepartmentCostTooltip } from "../../tool/DepartmentCostTooltip";
import { ChartPlaceholder } from "../../common/charts/ChartPlaceholder";

export const DepartmentCostBreakdown = ({
  departmentCosts,
}: {
  departmentCosts: DepartmentCost[];
}) => {
  const chartData = departmentCosts.map((dept) => ({
    name: dept.department,
    value: dept.total_cost,
    percentage: dept.cost_percentage,
    toolsCount: dept.tools_count,
    usersCount: dept.total_users,
  })) as ChartDataItem[] & Record<string, unknown>[];

  return (
    <Paper className="flex flex-col gap-4">
      <h3 className="text-md font-semibold text-text-light">
        Department Cost Breakdown
      </h3>
      {departmentCosts.length > 0 ? (
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, payload }) => {
                  const data = payload as ChartDataItem;
                  return `${name}: ${data.percentage.toFixed(1)}%`;
                }}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((_entry: unknown, index: number) => (
                  <Cell key={`cell-${index}`} fill={getChartColor(index)} />
                ))}
              </Pie>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Tooltip content={DepartmentCostTooltip as any} />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                formatter={(value, entry) => {
                  const data = entry?.payload as ChartDataItem | undefined;
                  return (
                    <span className="text-xs text-text-light/70">
                      {value}
                      {data && ` (${data.percentage.toFixed(1)}%)`}
                    </span>
                  );
                }}
                wrapperStyle={{ paddingLeft: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <ChartPlaceholder
          title="No department data available"
          content="The data will be displayed when it is available"
        />
      )}
    </Paper>
  );
};
