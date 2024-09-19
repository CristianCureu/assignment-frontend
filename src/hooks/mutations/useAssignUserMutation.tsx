import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignUserToProcess } from "@services/userService";
import { UserResponse } from "@src/types/userTypes";

type AssignUserInput = {
  identifier: string;
  processId: string;
};

export const useAssignUserToProcessMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ identifier, processId }: AssignUserInput) =>
      await assignUserToProcess(processId, identifier),

    onMutate: async ({ identifier, processId }) => {
      await queryClient.cancelQueries({ queryKey: ["processUsers", processId] });

      const previousData = queryClient.getQueryData<UserResponse[]>([
        "processUsers",
        processId,
      ]);

      queryClient.setQueryData<UserResponse[]>(["processUsers", processId], (oldUsers) =>
        oldUsers ? oldUsers.filter((user) => (user._id || user.email) !== identifier) : []
      );

      return { previousData };
    },

    onError: (error, { identifier, processId }, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<UserResponse[]>(
          ["processUsers", processId],
          context.previousData
        );
      }
      console.error(
        `Failed to remove user ${identifier} from process ${processId}:`,
        error
      );
    },

    onSettled: (data, error, { processId }) => {
      queryClient.invalidateQueries({ queryKey: ["processUsers", processId] });
    },
  });
};
