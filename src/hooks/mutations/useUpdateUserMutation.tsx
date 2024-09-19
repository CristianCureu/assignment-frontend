import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUser } from "@services/userService";
import { User } from "@src/types/userTypes";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onMutate: async (updatedUser: User) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousData = queryClient.getQueryData<User[]>(["users"]);

      queryClient.setQueryData<User[]>(["users"], (oldUsers) =>
        oldUsers?.map((user) =>
          user._id === updatedUser._id ? { ...user, ...updatedUser } : user
        )
      );
      return { previousData };
    },
    onError: (error, updatedUser, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<User[]>(["users"], context.previousData);
      }
      console.error(`Mutation failed for ${updatedUser}`, error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
