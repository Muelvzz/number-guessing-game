import { useEffect, useMemo, useState, type SetStateAction } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { AuthContext } from "../hooks/AuthContext"
import type { AuthData } from "../hooks/AuthContext"

const useJwtId = (
  setUser: React.Dispatch<SetStateAction<string | null>>,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
) => {

  useEffect(() => {
    const checkSession = async () => {
      try {
        const jwtToken: string | null = localStorage.getItem("access_token")
        if (!jwtToken) {
          setUser(null)
          return
        }
  
        setUser(jwtToken)
      } catch (error: unknown) {
        setUser(null)
        console.error(`[CLIENT] unable to restore session: ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [setIsLoading, setUser])

}

export const AuthProvider = () => {
  const [user, setUser] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigate = useNavigate()
  useJwtId(setUser, setIsLoading)

  const value = useMemo<AuthData>(() => {
    const login = async (data: string) => {
      setUser(data)
      navigate("/home")
    }

    const logout = () => {
      setUser(null)
      navigate("/", {replace: true})
    }

    return { user, isLoading, login, logout }
  }, [user, isLoading, navigate])

  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  )
}