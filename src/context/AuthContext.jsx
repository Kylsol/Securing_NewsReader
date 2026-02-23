import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("newsreader_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("newsreader_user");
      }
    }
  }, []);

  const login = (username, password, role) => {
    const cleaned = (username || "").trim();
    if (!cleaned) return false;

    const normalizedRole = role === "admin" ? "admin" : "regular";

    const nextUser = { username: cleaned, role: normalizedRole };
    setUser(nextUser);
    localStorage.setItem("newsreader_user", JSON.stringify(nextUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("newsreader_user");
  };

  const isAuthenticated = () => user !== null;
  const isAdmin = () => user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}