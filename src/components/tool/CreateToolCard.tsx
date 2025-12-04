import { useNavigate } from "react-router-dom";
import { PlusIcon } from "../../icons/actions/PlusIcon";

export const CreateToolCard = () => {
  const navigate = useNavigate();

  const handleCreateTool = () => {
    navigate("/tools/add");
  };

  return (
    <button
      onClick={handleCreateTool}
      className="bg-background rounded-lg shadow-md p-4 border-2 border-dashed border-border hover:border-primary hover:bg-background-alt transition-all duration-200 w-full h-full flex flex-col items-center justify-center gap-4 text-text-light hover:text-primary"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-background-alt border-2 border-border">
        <PlusIcon className="w-8 h-8" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold">Create a new tool</h3>
        <p className="text-sm text-text-light mt-1">
          Add a new tool to your catalog
        </p>
      </div>
    </button>
  );
};
