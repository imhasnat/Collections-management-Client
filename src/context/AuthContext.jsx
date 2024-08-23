import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const base_URL = "http://localhost:3306";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${base_URL}/auth/status`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        console.log(data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking authentication status:", error.message);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = (userData) => {
    console.log(userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      const response = await fetch(`${base_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
        return true;
      } else {
        console.error("Failed to log out.");
        return false;
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    trigger,
    setTrigger,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
