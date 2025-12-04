import { useNavigate } from "react-router-dom";

import { ToolForm } from "../../components/tool/ToolForm";
import { Paper } from "../../components/common/base/Paper";
import { useCreateTool } from "../../hooks/queries/tools/useCreateTool";
import type { CreateToolForm } from "../../services/tools.service";

export const ToolCreatePage = () => {
  const navigate = useNavigate();
  const createTool = useCreateTool();

  const handleSubmit = async (values: {
    name: string;
    description: string;
    vendor: string;
    category: string;
    owner_department: string;
    website_url: string;
    icon_url: string;
    status: string;
    monthly_cost: number;
  }) => {
    try {
      await createTool.mutateAsync(values as CreateToolForm);
      navigate("/tools");
    } catch (error) {
      // Error handling is done by React Query
      console.error("Failed to create tool:", error);
    }
  };

  return (
    <div className="py-6">
      <Paper elevation="sm" padding="lg" className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-light">
            Ajouter un nouvel outil
          </h1>
          <p className="text-sm text-text-light/80 mt-1">
            Renseignez les informations principales de l&apos;outil.
          </p>
        </div>

        <ToolForm
          submitLabel="Créer l'outil"
          onSubmit={handleSubmit}
          isSubmitting={createTool.isPending}
        />
      </Paper>
    </div>
  );
};
