import { useNavigate } from "react-router-dom";
import { ToolCard } from "./ToolCard";
import { CreateToolCard } from "./CreateToolCard";
import { Button } from "../common/base/buttons/Button";
import { PlusIcon } from "../../icons/actions/PlusIcon";
import type { Tool } from "../../types/entities/tool";

interface ToolCatalogProps {
  tools: Tool[];
}

export const ToolCatalog = ({ tools }: ToolCatalogProps) => {
  const navigate = useNavigate();

  const handleCreateTool = () => {
    navigate("/tools/add");
  };

  const toolsBeforeCreateCard = 2;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-light">Tool Catalog</h1>
        <span className="text-sm text-text-light">
          {tools.length} outil{tools.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Bouton Ajouter pour petits écrans */}
      <div className="mb-4 lg:hidden">
        <Button
          variant="solid"
          color="success"
          onClick={handleCreateTool}
          className="w-full md:w-auto"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add a tool
        </Button>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Afficher les 2 premiers outils */}
        {tools.slice(0, toolsBeforeCreateCard).map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}

        {/* Carte "Ajouter" en 3ème position sur grand écran */}
        <div className="hidden lg:block">
          <CreateToolCard />
        </div>

        {/* Afficher les outils restants */}
        {tools.slice(toolsBeforeCreateCard).map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};
