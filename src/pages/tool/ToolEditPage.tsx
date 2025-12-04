import { useParams, useNavigate } from "react-router-dom";

import { ToolForm } from "../../components/tool/ToolForm";
import { Paper } from "../../components/common/base/Paper";
import { Loader } from "../../components/common/loader/Loader";
import { useGetTool } from "../../hooks/queries/tools/useGetTool";
import { useEditTool } from "../../hooks/queries/tools/useEditTool";
import type { UpdateToolForm } from "../../services/tools.service";

export const ToolEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const toolId = Number(id);
  const { data: tool, isLoading, error } = useGetTool(toolId, !!toolId);
  const editTool = useEditTool();

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
    if (!toolId) {
      navigate("/tools");
      return;
    }

    try {
      await editTool.mutateAsync({
        id: toolId,
        data: values as UpdateToolForm,
      });
      navigate(`/tools/${toolId}`);
    } catch (error) {
      // Error handling is done by React Query
      console.error("Failed to update tool:", error);
    }
  };

  if (!toolId || Number.isNaN(toolId)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-error">
          Identifiant d&apos;outil invalide dans l&apos;URL.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-error">
          Impossible de charger cet outil pour la modification.
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <Paper elevation="sm" padding="lg" className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-light">
            Modifier l&apos;outil
          </h1>
          <p className="text-sm text-text-light/80 mt-1">
            Mettez à jour les informations de l&apos;outil sélectionné.
          </p>
        </div>

        <ToolForm
          initialValues={tool}
          submitLabel="Enregistrer les modifications"
          onSubmit={handleSubmit}
          isSubmitting={editTool.isPending}
        />
      </Paper>
    </div>
  );
};
