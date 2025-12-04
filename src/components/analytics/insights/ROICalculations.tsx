import { Paper } from "../../common/base/Paper";
import { DollarIcon } from "../../../icons/state/DollarIcon";

export const ROICalculations = () => {
  return (
    <Paper className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <DollarIcon className="w-5 h-5 text-text-light" />
        <h3 className="text-md font-semibold text-text-light">
          ROI Calculations
        </h3>
      </div>
    </Paper>
  );
};
