import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProcess } from "@services/processService";
import { Process, Processes } from "@src/types/apiTypes";

export const useCreateProcessMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProcess,
    onMutate: async (newProcess: Process) => {
      await queryClient.cancelQueries({ queryKey: ["userProcesses"] });

      const previousData = queryClient.getQueryData<Processes>(["userProcesses"]);

      queryClient.setQueryData<Processes>(["userProcesses"], (oldProcess) => [
        ...(oldProcess || []),
        { ...newProcess, id: "temp-id" },
      ]);

      console.log("newProcess: ", newProcess);
      console.log("previousData: ", previousData);

      return { previousData };
    },
    onError: (error, newProcess, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<Processes>(["userProcesses"], context.previousData);
      }
      console.error(`Mutation failed for ${newProcess}`, error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userProcesses"] });
    },
  });
};
