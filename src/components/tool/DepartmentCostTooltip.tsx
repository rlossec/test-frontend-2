import type { ChartDataItem } from "../../types/api/common";
import { formatCurrency } from "../../utils/string-utils";

interface DepartmentCostTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: ChartDataItem;
  }>;
}

export const DepartmentCostTooltip = ({
  active,
  payload,
}: DepartmentCostTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background-alt border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-text-light mb-2">
          {data.name}
        </p>
        <p className="text-xs text-text-light/80 mb-1">
          Cost: {formatCurrency(data.value)}
        </p>
        <p className="text-xs text-text-light/80 mb-1">
          Percentage: {data.percentage.toFixed(1)}%
        </p>
        <p className="text-xs text-text-light/80">
          {data.toolsCount} tools • {data.usersCount} users
        </p>
      </div>
    );
  }
  return null;
};
