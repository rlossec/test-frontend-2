import { Paper } from "../../common/base/Paper";
import { ChartPlaceholder } from "../../common/charts/ChartPlaceholder";

export const DepartmentActivity = () => {
  return (
    <Paper className="flex flex-col gap-4">
      <h3 className="text-md font-semibold text-text-light">
        Department Activity
      </h3>
      <ChartPlaceholder
        title="Department activity will be displayed here"
        content="Department activity graph will be displayed here"
      />
    </Paper>
  );
};
