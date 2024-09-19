import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCard } from "@services/processService";
import { Card, Cards } from "@src/types/apiTypes";

export const useCreateCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCard,
    onMutate: async (newCard: Card) => {
      await queryClient.cancelQueries({ queryKey: ["processCards"] });

      const previousData = queryClient.getQueryData<Cards>(["processCards"]);

      queryClient.setQueryData<Cards>(["processCards"], (oldCard) => [
        ...(oldCard || []),
        { ...newCard, id: "temp-id" },
      ]);

      return { previousData };
    },
    onError: (error, newCard, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<Cards>(["processCards"], context.previousData);
      }
      console.error(`Mutation failed for ${newCard}`, error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["processCards"] });
    },
  });
};
