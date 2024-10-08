import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const base_URL = "https://collections-management-server.onrender.com";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${base_URL}/auth/status`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    setUser(userData);
    setIsAuthenticated(true);
  };

  // const logout = async () => {
  //   try {
  //     const response = await fetch(`${base_URL}/logout`, {
  //       method: "POST",
  //       // credentials: "include",
  //     });

  //     if (response.ok) {
  //       setUser(null);
  //       setIsAuthenticated(false);
  //       return true;
  //     } else {
  //       console.error("Failed to log out.");
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Error during logout:", error.message);
  //   }
  // };

  const logout = async () => {
    try {
      // Optionally notify the backend to perform any cleanup if needed
      const response = await fetch(`${base_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the token to the backend if needed
        },
      });

      if (response.ok) {
        // Clear the token from local storage
        localStorage.removeItem("token");
        // Update the state to reflect the user is logged out
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
    setUser,
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
