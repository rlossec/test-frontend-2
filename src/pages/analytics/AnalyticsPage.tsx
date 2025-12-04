import { CostsAnalytics } from "../../components/analytics/CostsAnalytics";
import { InsightsDashboard } from "../../components/analytics/InsightsDashboard";
import { UsageAnalytics } from "../../components/analytics/UsageAnalytics";
import { Loader } from "../../components/common/loader/Loader";

import { useAnalytics } from "../../hooks/queries/analytics/useAnalytics";
import { useExpensiveTools } from "../../hooks/queries/analytics/useExpensiveTools";
import { useDepartmentCosts } from "../../hooks/queries/analytics/useDepartmentCosts";
import { ChartIcon } from "../../icons/state/ChartIcon";

export const AnalyticsPage = () => {
  const {
    data: analytics,
    isLoading: isLoadingAnalytics,
    error: errorAnalytics,
  } = useAnalytics();

  const {
    data: expensiveToolsResponse,
    isLoading: isLoadingExpensiveTools,
    error: errorExpensiveTools,
  } = useExpensiveTools({ limit: 10 });
  const {
    data: departmentCostsResponse,
    isLoading: isLoadingDepartmentCosts,
    error: errorDepartmentCosts,
  } = useDepartmentCosts({ sort_by: "total_cost", order: "desc" });

  const isLoading =
    isLoadingAnalytics || isLoadingExpensiveTools || isLoadingDepartmentCosts;
  const hasError =
    errorAnalytics || errorExpensiveTools || errorDepartmentCosts;

  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <ChartIcon className="w-8 h-8 text-text-light" />
          <h1 className="text-3xl font-bold text-text-light">
            Analytics Dashboard
          </h1>
        </div>
      </div>

      {/* Analytics Sections */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader size={24} />
        </div>
      ) : hasError ? (
        <div className="text-error">
          {hasError instanceof Error ? hasError.message : "An error occurred"}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {analytics && expensiveToolsResponse && departmentCostsResponse && (
            <CostsAnalytics
              analytics={analytics}
              expensiveTools={expensiveToolsResponse?.data || []}
              departmentCosts={departmentCostsResponse?.data || []}
            />
          )}
          <UsageAnalytics />
          <InsightsDashboard />
        </div>
      )}
    </div>
  );
};
