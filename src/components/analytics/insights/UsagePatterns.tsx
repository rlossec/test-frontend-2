import { Paper } from "../../common/base/Paper";
import { ChartIcon } from "../../../icons/state/ChartIcon";
import { ChartPlaceholder } from "../../common/charts/ChartPlaceholder";

export const UsagePatterns = () => {
  return (
    <Paper className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <ChartIcon className="w-5 h-5 text-text-light" />
        <h3 className="text-md font-semibold text-text-light">
          Usage Patterns
        </h3>
      </div>
      <ChartPlaceholder
        title="Usage patterns will be displayed here"
        content="Heatmaps and sparklines will be displayed here"
      />
    </Paper>
  );
};
