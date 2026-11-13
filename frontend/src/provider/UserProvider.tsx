import { type ReactNode, useState } from "react"
import { type UserContextType, UserContext } from "../hooks/UserContext"

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider = ({children}: UserProviderProps) => {
  const [user] = useState<UserContextType | null>(null)

  return (
    <>    
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    </>
  )
}