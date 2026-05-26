import React, { createContext, useContext, useState, useEffect } from "react";

// تعریف ساختار داده‌هایی که در کل سایت نیاز داریم
interface AuthContextType {
  isLoggedIn: boolean;
  login: (accessToken: string, refreshToken: string, username: string) => void;
  logout: () => void;
  username: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // وقتی سایت بالا می‌آید چک کن آیا توکن از قبل هست یا نه
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

  const logout = () => {
    localStorage.clear(); // پاک کردن همه اطلاعات
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

// یک هوک ساده برای استفاده در صفحات
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
