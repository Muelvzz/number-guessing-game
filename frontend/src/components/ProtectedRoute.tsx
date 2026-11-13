import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export const ProtectedRoute = () => {
  const navigate = useNavigate()
  const data = useAuth()

  useEffect(() => {
    if (!data?.user && !data?.isLoading) {
      navigate("/sign-in", {replace: true})
    }
  }, [data?.isLoading, data?.user, navigate])

  if (data?.isLoading) {
    return (
      <>
        <div>
          Loading Session
        </div>
      </>
    )
  }

  return data?.user ? <Outlet /> : null
}