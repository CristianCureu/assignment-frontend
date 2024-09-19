import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, Cards } from "@src/types/apiTypes";
import { updateCard } from "@services/processService";

export const useUpdateCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { cardId: string; updatedCard: Partial<Card> }) =>
      updateCard(variables.cardId, variables.updatedCard),

    onMutate: async (updatedData: { cardId: string; updatedCard: Partial<Card> }) => {
      const { cardId, updatedCard } = updatedData;

      await queryClient.cancelQueries({ queryKey: ["cards"] });

      const previousData = queryClient.getQueryData<Cards>(["cards"]);

      queryClient.setQueryData<Cards>(["cards"], (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((card) =>
          card._id === cardId ? { ...card, ...updatedCard } : card
        );
      });

      return { previousData };
    },

    onError: (error, updatedData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<Cards>(["cards"], context.previousData);
      }
      console.error(`Mutation failed for card ${updatedData.cardId}`, error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};
