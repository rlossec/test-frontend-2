import { Paper } from "../../common/base/Paper";
import { ChartPlaceholder } from "../../common/charts/ChartPlaceholder";

export const MostLeastUsedTools = () => {
  return (
    <Paper className="flex flex-col gap-4">
      <h3 className="text-md font-semibold text-text-light">
        Most/Least Used Tools
      </h3>
      <ChartPlaceholder
        title="Les outils les plus et moins utilisés seront affichés ici"
        content="Graphique comparatif à venir"
      />
    </Paper>
  );
};
