import { DepartmentActivity } from "./usages/DepartmentActivity";
import { GrowthTrends } from "./usages/GrowthTrends";
import { MostLeastUsedTools } from "./usages/MostLeastUsedTools";
import { UserAdoptionRates } from "./usages/UserAdoptionRates";
import { ChartIcon } from "../../icons/state/ChartIcon";

export const UsageAnalytics = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <ChartIcon className="w-6 h-6 text-text-light" />
        <h2 className="text-xl font-semibold text-text-light">
          Usage Analytics
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserAdoptionRates />
        <MostLeastUsedTools />
        <DepartmentActivity />
        <GrowthTrends />
      </div>
    </section>
  );
};
