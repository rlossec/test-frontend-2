import { DataTable } from "../common/data/DataTable";
import { StatusBadge, type StatusVariant } from "./StatusBadge";

import type { Tool, ToolStatus } from "../../types/entities";
import { DisplayToolIcon } from "./DisplayToolIcon";

interface ToolsTableProps {
  tools: Tool[];
}

const statusVariantMap: Record<ToolStatus, StatusVariant> = {
  active: "success",
  expiring: "warning",
  unused: "error",
};

export const ToolsTable = ({ tools }: ToolsTableProps) => {
  const columns = [
    {
      header: "Name",
      key: "name" as const,
      sortable: true,
      render: (item: Tool) => (
        <div className="flex items-center gap-2">
          <DisplayToolIcon iconUrl={item.icon_url} toolName={item.name} />
          <span>{item.name || "-"}</span>
        </div>
      ),
    },
    {
      header: "Department",
      key: "owner_department" as const,
      sortable: true,
    },
    {
      header: "Users",
      key: "active_users_count" as const,
      sortable: true,
    },
    {
      header: "Monthly Cost",
      key: "monthly_cost" as const,
      sortable: true,
      render: (item: Tool) =>
        item.monthly_cost != null
          ? `€${item.monthly_cost.toLocaleString()}`
          : "-",
    },
    {
      header: "Status",
      key: "status" as const,
      sortable: true,
      render: (item: Tool) => {
        if (!item.status) {
          return "-";
        }
        const variant = statusVariantMap[item.status] || "default";
        return <StatusBadge status={item.status} variant={variant} />;
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={tools}
      keyExtractor={(tool) => tool.id}
      pagination={{ pageSize: 10, showPageSizeSelector: true }}
    />
  );
};
