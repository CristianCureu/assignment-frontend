import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import { LoginData } from "@src/types/formTypes";
import { getUser } from "@services/userService";
import { decodeToken } from "@services/token";
import { User } from "@src/types/userTypes";
import useAuth from "@hooks/useAuth";

const initialUser = {
  _id: "",
  email: "",
  name: "",
  surname: "",
  workspace: "",
  avatar: "",
};

type UserContextValue = {
  user: User;
  login: (loginData: LoginData) => void;
  logout: () => void;
  clearUser: () => void;
  isAuthenticated: boolean;
};

export const UserContext = createContext<UserContextValue>({
  user: initialUser,
  login: async () => {},
  logout: () => {},
  clearUser: () => {},
  isAuthenticated: false,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleLogin, logout, isAuthenticated } = useAuth();
  const [user, setUser] = useState<User>(initialUser);

  const clearUser = () => {
    setUser(initialUser);
    logout();
  };

  const fetchUserData = async () => {
    if (isAuthenticated) {
      const { id } = decodeToken();
      const userData = await getUser(id);
      setUser(userData);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  const contextValue = useMemo(
    () => ({
      user,
      login: handleLogin,
      logout,
      clearUser,
      isAuthenticated,
    }),
    [user, handleLogin, logout, isAuthenticated]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
