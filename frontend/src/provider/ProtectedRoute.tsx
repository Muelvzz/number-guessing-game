import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import LoadingPage from "../components/LoadingPage";

// FIXME: Move to the current file to their respective folder

export const ProtectedRoute = () => {
  const data = useAuth()

  if (data?.isLoading) return <LoadingPage />

  return data?.user ? <Outlet /> : <Navigate to="/" replace />
}