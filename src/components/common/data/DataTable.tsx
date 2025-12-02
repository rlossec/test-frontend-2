import { type ReactNode, useState } from "react";
import { ChevronDownIcon } from "../../../icons/navigation/ChevronDownIcon";
import { ChevronLeftIcon } from "../../../icons/navigation/ChevronLeftIcon";
import { ChevronRightIcon } from "../../../icons/navigation/ChevronRightIcon";
import { ChevronUpIcon } from "../../../icons/navigation/ChevronUpIcon";
import { MoreVerticalIcon } from "../../../icons/actions/MoreVerticalIcon";

import { DropdownMenu } from "../layout/DropdownMenu";
import { DropdownMenuItem } from "../layout/DropdownMenuItem";

export interface Column<T extends object> {
  key: keyof T;
  header: string;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface ActionItem<T extends object> {
  label: string;
  icon?: ReactNode;
  onClick: (item: T) => void;
  disabled?: boolean;
  divider?: boolean;
}

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  pagination?: {
    pageSize?: number;
    showPageSizeSelector?: boolean;
  };
  actions?: ActionItem<T>[];
  className?: string;
}

type SortDirection = "asc" | "desc" | null;

export function DataTable<T extends object>({
  columns,
  data,
  keyExtractor,
  selectable = false,
  onSelectionChange,
  pagination,
  actions,
  className = "",
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pagination?.pageSize || 10);

  // Gestion du tri
  const handleSort = (columnKey: keyof T) => {
    // Si on clique sur la même colonne, on inverse la direction
    if (sortColumn === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
      // Réinitialiser la pagination lors d'un nouveau tri
      setCurrentPage(1);
    }
  };

  // Gestion de la sélection
  const handleSelectAll = (checked: boolean) => {
    const newSelectedIds = checked ? data.map(keyExtractor) : [];
    setSelectedIds(newSelectedIds);
    onSelectionChange?.(newSelectedIds);
  };

  const handleSelectItem = (id: string | number, checked: boolean) => {
    const newSelectedIds = checked
      ? [...selectedIds, id]
      : selectedIds.filter((selectedId) => selectedId !== id);
    setSelectedIds(newSelectedIds);
    onSelectionChange?.(newSelectedIds);
  };

  // Tri et pagination des données
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;

    const column = columns.find((col) => col.key === sortColumn);
    if (!column) return 0;

    // Pour le tri, on utilise toujours les valeurs réelles des propriétés
    // et non pas le rendu personnalisé
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    // Gestion des valeurs boolean
    if (typeof aValue === "boolean" && typeof bValue === "boolean") {
      return sortDirection === "asc"
        ? aValue === bValue
          ? 0
          : aValue
          ? 1
          : -1
        : aValue === bValue
        ? 0
        : aValue
        ? -1
        : 1;
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Conversion des actions en format DropdownItem
  const getActionDropdownItems = (
    item: T
  ): Array<ActionItem<T> & { onClick: () => void }> => {
    if (!actions) return [];

    return actions.map((action) => ({
      label: action.label,
      icon: action.icon,
      disabled: action.disabled,
      divider: action.divider,
      onClick: () => action.onClick(item),
    }));
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-background-alt">
            <tr>
              {selectable && (
                <th scope="col" className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary"
                    checked={selectedIds.length === data.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider ${
                    column.sortable ? "cursor-pointer" : ""
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && sortColumn === column.key && (
                      <span className="text-text-light">
                        {sortDirection === "asc" ? (
                          <ChevronUpIcon className="w-4 h-4" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th scope="col" className="w-16 px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-background-alt text-text-light divide-y divide-border">
            {paginatedData.map((item) => {
              const id = keyExtractor(item);
              return (
                <tr key={id} className="">
                  {selectable && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-border text-primary focus:ring-primary"
                        checked={selectedIds.includes(id)}
                        onChange={(e) => handleSelectItem(id, e.target.checked)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-6 py-4 whitespace-nowrap text-sm text-text-dark"
                    >
                      {column.render
                        ? column.render(item)
                        : String(item[column.key])}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark">
                      <DropdownMenu
                        trigger={
                          <MoreVerticalIcon className="w-4 h-4 text-text-light" />
                        }
                      >
                        {getActionDropdownItems(item).map((action, index) => (
                          <div key={action.label}>
                            {action.divider && index > 0 && (
                              <div className="border-t border-border my-1" />
                            )}
                            <DropdownMenuItem
                              onClick={action.onClick}
                              disabled={action.disabled}
                            >
                              <div className="flex items-center gap-2">
                                {action.icon}
                                {action.label}
                              </div>
                            </DropdownMenuItem>
                          </div>
                        ))}
                      </DropdownMenu>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-background-alt border-t border-border sm:px-6">
          <div className="flex items-center gap-2">
            {pagination.showPageSizeSelector && (
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-md border-gray-300 text-sm"
              >
                <option value="10">10 par page</option>
                <option value="25">25 par page</option>
                <option value="50">50 par page</option>
                <option value="100">100 par page</option>
              </select>
            )}
            <span className="text-sm text-text-light">
              Affichage de {(currentPage - 1) * pageSize + 1} à{" "}
              {Math.min(currentPage * pageSize, data.length)} sur {data.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === page
                    ? "bg-primary text-background"
                    : "border border-border hover:bg-background-alt"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
