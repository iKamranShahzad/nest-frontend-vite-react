// This file should only export the provider component
import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./Auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      console.log("Checking authentication status...");
      const res = await fetch("http://localhost:3000/sayname", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "test" }),
        credentials: "include",
      });

      // Print the response status to debug
      console.log("Auth check response status:", res.status);

      // Explicitly check if response is 200/201 and update state
      const isAuthenticated = res.status === 200 || res.status === 201;
      console.log("Setting isLoggedIn to:", isAuthenticated);
      setIsLoggedIn(isAuthenticated);

      return isAuthenticated;
    } catch (err) {
      console.error("Auth check error:", err);
      setIsLoggedIn(false);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    console.log("Logging out...");
    try {
      await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      console.log("Logout successful, setting isLoggedIn to false");
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Logout error:", err);
      // Still set to false on error
      setIsLoggedIn(false);
    }
  }, []);

  // Run authentication check on mount
  useEffect(() => {
    console.log("AuthProvider mounted - checking auth");
    checkAuth().then((result) => {
      console.log("Initial auth check complete, isLoggedIn:", result);
    });
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
