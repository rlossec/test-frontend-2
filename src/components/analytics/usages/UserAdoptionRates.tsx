import { Paper } from "../../common/base/Paper";
import { ChartPlaceholder } from "../../common/charts/ChartPlaceholder";

export const UserAdoptionRates = () => {
  return (
    <Paper className="flex flex-col gap-4">
      <h3 className="text-md font-semibold text-text-light">
        User Adoption Rates
      </h3>
      <ChartPlaceholder
        title="User adoption rates will be displayed here"
        content="User adoption rate graph will be displayed here"
      />
    </Paper>
  );
};
