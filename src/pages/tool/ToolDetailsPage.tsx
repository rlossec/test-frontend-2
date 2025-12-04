import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Paper } from "../../components/common/base/Paper";
import { Loader } from "../../components/common/loader/Loader";
import { Badge } from "../../components/common/base/Badge";
import { Button } from "../../components/common/base/buttons/Button";
import { IconButton } from "../../components/common/base/buttons/IconButton";
import { ModalConfirmation } from "../../components/common/overlay/ModalConfirmation";

import { useGetTool } from "../../hooks/queries/tools/useGetTool";
import { useDeleteTool } from "../../hooks/queries/tools/useDeleteTool";

import { StatusBadge } from "../../components/tool/StatusBadge";
import { DisplayToolIcon } from "../../components/tool/DisplayToolIcon";

import { formatDate } from "../../utils/date-utils";

import { PencilIcon } from "../../icons/actions/PencilIcon";
import { TrashIcon } from "../../icons/actions/TrashIcon";
import { ExternalLinkIcon } from "../../icons/navigation/ExternalLinkIcon";
import { ChevronLeftIcon } from "../../icons/navigation/ChevronLeftIcon";

export const ToolDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toolId = Number(id);
  const { data: tool, isLoading, error } = useGetTool(toolId, !!toolId);
  const deleteTool = useDeleteTool();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/tools/${toolId}/edit`);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!toolId) return;
    try {
      await deleteTool.mutateAsync(toolId);
      navigate("/tools");
    } catch (error) {
      // Error handling is done by React Query
      console.error("Failed to delete tool:", error);
    }
  };

  if (!toolId || Number.isNaN(toolId)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-error">Invalid tool ID in URL.</div>
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
        <div className="text-error">Unable to load this tool.</div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/tools")}
          className="mb-4"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Back to tools
        </Button>

        {/* Header Section */}
        <Paper elevation="sm" padding="lg">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <DisplayToolIcon
                iconUrl={tool.icon_url}
                toolName={tool.name}
                size={80}
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-text-light">
                    {tool.name}
                  </h1>
                  <StatusBadge status={tool.status} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge size="md" variant="default">
                    {tool.category}
                  </Badge>
                  {tool.vendor && (
                    <span className="text-sm text-text-light">
                      by {tool.vendor}
                    </span>
                  )}
                </div>
                {tool.description && (
                  <p className="text-text-light mt-2">{tool.description}</p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 shrink-0">
              {tool.website_url && (
                <IconButton
                  variant="outline"
                  icon={<ExternalLinkIcon />}
                  ariaLabel="Open website"
                  onClick={() => window.open(tool.website_url, "_blank")}
                  size="md"
                />
              )}
              <IconButton
                variant="outline"
                icon={<PencilIcon />}
                ariaLabel="Edit"
                onClick={handleEdit}
                size="md"
              />
              <IconButton
                variant="outline"
                icon={<TrashIcon />}
                ariaLabel="Delete"
                onClick={handleDeleteClick}
                size="md"
                color="error"
              />
            </div>
          </div>
        </Paper>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Financial Information */}
          <Paper elevation="sm" padding="lg">
            <h2 className="text-xl font-semibold text-text-light mb-4">
              Financial Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-light">Monthly Cost</span>
                <span className="text-lg font-semibold text-text-light">
                  {tool.monthly_cost
                    ? `${tool.monthly_cost.toLocaleString()}€`
                    : "0€"}
                </span>
              </div>
              {tool.previous_month_cost !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-text-light">Previous Month Cost</span>
                  <span className="text-text-light">
                    {tool.previous_month_cost.toLocaleString()}€
                  </span>
                </div>
              )}
            </div>
          </Paper>

          {/* Usage Information */}
          <Paper elevation="sm" padding="lg">
            <h2 className="text-xl font-semibold text-text-light mb-4">
              Usage Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-light">Active Users</span>
                <span className="text-lg font-semibold text-text-light">
                  {tool.active_users_count}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-light">Owner Department</span>
                <Badge size="sm" variant="default">
                  {tool.owner_department}
                </Badge>
              </div>
            </div>
          </Paper>
        </div>

        {/* Metadata */}
        <Paper elevation="sm" padding="lg">
          <h2 className="text-xl font-semibold text-text-light mb-4">
            Metadata
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-light/70">Created at</span>
              <p className="text-text-light">{formatDate(tool.created_at)}</p>
            </div>
            <div>
              <span className="text-sm text-text-light/70">Last updated</span>
              <p className="text-text-light">{formatDate(tool.updated_at)}</p>
            </div>
            {tool.website_url && (
              <div className="md:col-span-2">
                <span className="text-sm text-text-light/70">Website</span>
                <p className="text-text-light">
                  <a
                    href={tool.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {tool.website_url}
                  </a>
                </p>
              </div>
            )}
          </div>
        </Paper>

        {/* Delete Confirmation Modal */}
        <ModalConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete tool"
          message={`Are you sure you want to delete "${tool.name}"? This action cannot be undone.`}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmColor="error"
          isLoading={deleteTool.isPending}
        />
      </div>
    </div>
  );
};
