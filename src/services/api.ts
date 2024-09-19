import { decodeToken, isTokenExpired } from "@services/token";

export const apiUrl = "http://localhost:3000";

type RefreshResponse = {
  token: string;
  refresh_token: string;
  detail?: string;
};

const refreshToken = async (
  token: string,
  refreshToken: string
): Promise<{ newToken: string; newRefreshToken: string }> => {
  const response = await fetch(`${apiUrl}/api/auth/token/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, refresh_token: refreshToken }),
  });

  const data: RefreshResponse = await response.json();

  if (!response.ok) {
    const { detail } = data;
    localStorage.removeItem("authToken");
    throw new Error(detail);
  }

  const { token: newToken, refresh_token: newRefreshToken } = data;

  return { newToken, newRefreshToken };
};

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  signal?: AbortSignal
) => {
  let authToken = localStorage.getItem("authToken");
  let authRefreshToken = localStorage.getItem("authRefreshToken");

  if (!authToken || !authRefreshToken) {
    throw new Error("Not authorized");
  }
  const decodedToken = decodeToken();

  if (decodedToken && typeof decodedToken.exp === "number") {
    const expirationTime = decodedToken.exp * 1000;

    if (isTokenExpired(expirationTime)) {
      try {
        const { newToken, newRefreshToken } = await refreshToken(
          authToken,
          authRefreshToken
        );
        authToken = newToken;
        authRefreshToken = newRefreshToken;

        localStorage.setItem("authToken", newToken);
        localStorage.setItem("authRefreshToken", newRefreshToken);
      } catch (error) {
        throw new Error("Not authorized");
      }
    }
  } else {
    throw new Error("Not authorized");
  }

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    signal,
  });

  if (!response.ok) {
    throw new Error("Not authorized");
  }

  return await response.json();
};
