import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const EXPIRE_TIME = 24 * 60 * 60 * 1000; // 24 hours

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("auth");
    if (!storedUser || storedUser === "undefined") return;

    try {
      const parsedUser = JSON.parse(storedUser);

      if (Date.now() > parsedUser.expireAt) {
        // 🔥 session expired
        localStorage.removeItem("auth");
        setUser(null);
        navigate("/login");
      } else {
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Invalid auth data");
      localStorage.removeItem("auth");
      setUser(null);
    }
  }, [navigate]);

  // ✅ Login
  const login = useCallback((data) => {
    const authData = {
      ...data,
      expireAt: Date.now() + EXPIRE_TIME,
    };

    setUser(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  }, []);

  // ✅ Logout
  const logOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth");
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logOut,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
