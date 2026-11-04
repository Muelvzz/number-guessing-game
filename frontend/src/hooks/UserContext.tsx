import { createContext, useContext, useState, type ReactNode } from "react";

type UserDataType = {
  id: number
  username: string
  email: string
}

export type UserContextType = {
  userData: UserDataType,
  handleUserData: (payload: UserDataType) => void
}

type UserProviderProps = {
  children: ReactNode
}

export const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<UserDataType>({id: 0, username: "", email: ""})
  const handleUserData = async (payload: UserDataType) => {
    setUserData(payload)
  }

  return (
    <UserContext value={{ userData, handleUserData }}>
      {children}  
    </UserContext>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error("[CLIENT] useUser must be used within a UserProvider")
  return context
}