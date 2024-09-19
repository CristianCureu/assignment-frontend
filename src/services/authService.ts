import { LoginData, UserCredentialsData, WorkspaceData } from "@src/types/formTypes";
import { AuthResponse } from "@src/types/userTypes";
import { apiUrl } from "@services/api";

export const register = async (
  registerData: WorkspaceData & UserCredentialsData
): Promise<AuthResponse> => {
  const { workspace, email, name, surname, password } = registerData;

  const response = await fetch(`${apiUrl}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      workspace,
      email,
      name,
      surname,
      password,
    }),
  });

  return await response.json();
};

export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  const { email, password } = loginData;

  const response = await fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return await response.json();
};
