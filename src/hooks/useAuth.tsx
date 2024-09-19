import { useMemo, useState } from "react";

import { login } from "@services/authService";
import { LoginData } from "@src/types/formTypes";
import { router } from "@routes/router"; 

export type AuthContextType = {
  handleLogin: (loginData: LoginData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const useAuth = (): AuthContextType => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );

  const handleLogin = async (loginData: LoginData) => {
    const { success, message, token, refreshToken } = await login(loginData);
    if (success) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("authRefreshToken", refreshToken);
      setAuthToken(token);
      router.navigate("/processes");
    } else {
      throw new Error(message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authRefreshToken");
    setAuthToken(null);
    router.navigate("/login");
  };

  const isAuthenticated = useMemo(() => {
    return authToken !== null;
  }, [authToken]);

  return { handleLogin, logout, isAuthenticated };
};

export default useAuth;
