import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export const ProtectedRoute = () => {
  const data = useAuth()

  if (data?.isLoading) return <div role="status">Checking session...</div>

  return data?.user ? <Outlet /> : <Navigate to="/" replace />
}