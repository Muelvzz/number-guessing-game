import { createContext, useContext } from "react";

export type AuthData = {
  user: string | null;
  login: (data: string) => Promise<void>;
  logout: (data: string) => void;
  isLoading: boolean
}

export const AuthContext = createContext<AuthData | null>(null);
export const useAuth = () => { return useContext(AuthContext) }