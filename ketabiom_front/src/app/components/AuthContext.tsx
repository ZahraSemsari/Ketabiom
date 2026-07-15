import React, { createContext, useContext, useEffect, useState } from "react";
interface AuthContextType {
  isLoggedIn: boolean;
  login: (accessToken: string, refreshToken: string, username: string) => void;
  logout: () => void;
  username: string | null;
  updateUsername: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("username");

    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUser);
    }
  }, []);

  const login = (accessToken: string, refreshToken: string, user: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("username", user);

    setIsLoggedIn(true);
    setUsername(user);
  };

  const updateUsername = (newUsername: string) => {
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
  };

  const logout = () => {
    localStorage.clear();

    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        username,
        updateUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
