import { Paper } from "../../common/base/Paper";
import { WrenchIcon } from "../../../icons/user-interface/WrenchIcon";

export const UnusedToolsWarnings = () => {
  return (
    <Paper className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <WrenchIcon className="w-5 h-5 text-text-light" />
        <h3 className="text-md font-semibold text-text-light">
          Unused Tools Warnings
        </h3>
      </div>
    </Paper>
  );
};
