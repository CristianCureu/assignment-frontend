import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTask } from "@services/taskService";
import { Task, Tasks } from "@src/types/taskTypes";

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onMutate: async (updatedTask: Task) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousData = queryClient.getQueryData<Tasks>(["tasks"]);

      queryClient.setQueryData<Tasks>(["tasks"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          [updatedTask.status]:
            oldData[updatedTask.status]?.map((task) =>
              task._id === updatedTask._id ? { ...updatedTask } : task
            ) || [],
        };
      });

      return { previousData };
    },
    onError: (error, updatedTask, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<Tasks>(["tasks"], context.previousData);
      }
      console.error(`Mutation failed for ${updatedTask}`, error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
