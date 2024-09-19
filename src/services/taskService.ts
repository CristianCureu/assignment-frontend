import { Task } from "@src/types/taskTypes";
import { apiUrl, fetchWithAuth } from "./api";

export const getAllTasks = async () => {
  return await fetchWithAuth(`${apiUrl}/api/task`);
};

export const updateTask = async (task: Task) => {
  return await fetchWithAuth(`${apiUrl}/api/task/${task._id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });
};
