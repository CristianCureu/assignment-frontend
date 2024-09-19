import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeUserFromProcess } from "@services/userService";
import { UserResponse } from "@src/types/userTypes";

export const useRemoveUserFromProcessMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, processId }: { userId: string; processId: string }) =>
      removeUserFromProcess(processId, userId),

    onMutate: async ({ userId, processId }) => {
      await queryClient.cancelQueries({ queryKey: ["processUsers", processId] });

      const previousData = queryClient.getQueryData<UserResponse[]>([
        "processUsers",
        processId,
      ]);

      queryClient.setQueryData<UserResponse[]>(["processUsers", processId], (oldUsers) =>
        oldUsers ? oldUsers.filter((user) => user._id !== userId) : []
      );

      return { previousData };
    },

    onError: (error, { userId, processId }, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<UserResponse[]>(
          ["processUsers", processId],
          context.previousData
        );
      }
      console.error(`Failed to remove user ${userId} from process ${processId}:`, error);
    },

    onSettled: (data, error, { processId }) => {
      queryClient.invalidateQueries({ queryKey: ["processUsers", processId] });
    },
  });
};
