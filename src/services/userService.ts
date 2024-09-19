import { apiUrl, fetchWithAuth } from "@services/api";
import { User } from "@src/types/userTypes";

export const getUser = async (userId: string) => {
  return await fetchWithAuth(`${apiUrl}/api/user/${userId}`);
};

export const getAllUsers = async () => {
  return await fetchWithAuth(`${apiUrl}/api/user`);
};

export const getUserProcesses = async (userId: string) => {
  return await fetchWithAuth(`${apiUrl}/api/assignments/process/${userId}`);
};

export const getUserTasks = async (userId: string) => {
  return await fetchWithAuth(`${apiUrl}/api/user-task/task/${userId}`);
};

export const getProcessUsers = async (processId: string) => {
  return await fetchWithAuth(`${apiUrl}/api/assignments/user/${processId}`);
};

export const removeUserFromProcess = async (processId: string, userId: string) => {
  return await fetchWithAuth(`${apiUrl}/api/assignments`, {
    method: "DELETE",
    body: JSON.stringify({ userId, processId }),
  });
};

export const assignUserToProcess = async (processId: string, identifier: string) => {
  if (identifier.includes("@")) {
    return await fetchWithAuth(`${apiUrl}/api/assignments`, {
      method: "POST",
      body: JSON.stringify({ email: identifier, processId }),
    });
  }

  return await fetchWithAuth(`${apiUrl}/api/assignments`, {
    method: "POST",
    body: JSON.stringify({ userId: identifier, processId }),
  });
};

export const updateUser = async (user: User) => {
  return await fetchWithAuth(`${apiUrl}/api/user/${user._id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
};
