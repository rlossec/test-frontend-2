
import { Paper } from "../../common/base/Paper";
import { BellIcon } from "../../../icons/state/BellIcon";

export const CostOptimizationAlerts = () => {
  return (
    <Paper className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <BellIcon className="w-5 h-5 text-text-light" />
        <h3 className="text-md font-semibold text-text-light">
          Cost Optimization Alerts
        </h3>
      </div>
    </Paper>
  );
};
