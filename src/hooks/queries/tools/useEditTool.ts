import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  toolsService,
  type UpdateToolForm,
} from "../../../services/tools.service";
import { toolsKeys } from "./tools-keys";

export function useEditTool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateToolForm }) =>
      toolsService.update(id, data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch tools list and specific tool detail
      queryClient.invalidateQueries({ queryKey: toolsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: toolsKeys.detail(variables.id),
      });
    },
  });
}
