import { type ReactNode, useState } from "react"
import { type UserData, UserContext } from "../hooks/UserContext"

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null)

  return (
    <>    
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    </>
  )
}