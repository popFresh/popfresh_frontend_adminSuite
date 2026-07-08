import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ==============================================
  // CHECK AUTH ON APP LOAD
  // ==============================================

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await getCurrentUser();

      setUser(response.data);

      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("token");

      setUser(null);

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // ==============================================
  // LOGIN
  // ==============================================

  const login = ({ token, user }) => {
    localStorage.setItem("token", token);

    setUser(user);

    setIsAuthenticated(true);
  };

  // ==============================================
// UPDATE USER
// ==============================================

const updateUser = (updatedUser) => {
  setUser(updatedUser);
};

  // ==============================================
  // LOGOUT
  // ==============================================

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
  value={{
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  }}
>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);