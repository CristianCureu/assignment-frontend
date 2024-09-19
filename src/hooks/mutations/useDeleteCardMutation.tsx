import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCard } from "@services/processService";
import { Cards } from "@src/types/apiTypes";

export const useDeleteCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCard,
    onMutate: async (cardId) => {
      await queryClient.cancelQueries({ queryKey: ["processCards"] });

      const previousData = queryClient.getQueryData<Cards>(["processCards"]);

      queryClient.setQueryData<Cards>(["processCards"], (oldCards) =>
        oldCards?.filter((card) => card._id !== cardId)
      );
      return { previousData };
    },
    onError: (error, card, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<Cards>(["processCards"], context.previousData);
      }
      console.error(`Mutation failed for ${card}`, error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["processCards"] });
    },
  });
};
