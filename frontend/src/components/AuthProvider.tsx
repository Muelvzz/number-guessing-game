import { useEffect, useMemo, useState, type SetStateAction } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { AuthContext } from "../hooks/AuthContext"
import type { AuthData } from "../hooks/AuthContext"
import { validateAccessToken } from "../service/api"
import { clearToken, getToken, setTokenWithExpiry } from "../service/setToken"

// FIXME: Move the current file to their respective folder.

const useJwtId = (
  setUser: React.Dispatch<SetStateAction<string | null>>,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
) => {

  useEffect(() => {
    const checkSession = async () => {
      try {
        const jwtToken: string | null = getToken("access_token")
        }

        if (await validateAccessToken(jwtToken)) {
          setUser(jwtToken)
        } else {
          clearToken("access_token")
          setUser(null)
        }
      } catch (error: unknown) {
        setUser(null)
        if (error instanceof Error) {
          console.error(`[CLIENT] unable to restore session: ${error.message}`)
        } else {
          console.error(`[CLIENT] unable to restore session: ${error}`)
        }
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
      if (!(await validateAccessToken(data))) {
        throw new Error("[CLIENT] Login returned an invalid access token")
      }

      setTokenWithExpiry("access_token", data)
      setUser(data)
      navigate("/home")
    }

    const logout = () => {
      clearToken("access_token")
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