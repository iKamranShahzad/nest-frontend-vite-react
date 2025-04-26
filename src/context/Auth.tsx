// This file should only export the context
import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  checkAuth: async () => {},
  logout: async () => {},
});
