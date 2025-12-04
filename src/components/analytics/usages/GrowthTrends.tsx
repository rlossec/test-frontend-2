import { Paper } from "../../common/base/Paper";
import { ChartPlaceholder } from "../../common/charts/ChartPlaceholder";

export const GrowthTrends = () => {
  return (
    <Paper className="flex flex-col gap-4">
      <h3 className="text-md font-semibold text-text-light">Growth Trends</h3>
      <ChartPlaceholder
        title="Les tendances de croissance seront affichées ici"
        content="Graphique d'évolution temporelle à venir"
      />
    </Paper>
  );
};
