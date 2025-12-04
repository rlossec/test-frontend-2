import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  toolsService,
  type CreateToolForm,
} from "../../../services/tools.service";
import { toolsKeys } from "./tools-keys";

export function useCreateTool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateToolForm) => toolsService.create(data),
    onSuccess: () => {
      // Invalidate and refetch tools list after creation
      queryClient.invalidateQueries({ queryKey: toolsKeys.lists() });
    },
  });
}
