import { createContext, useContext } from "react";

export type UserData = {
  id: number
  username: string
  email: string
}

export const UserContext = createContext<UserData | null>(null)

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === null) throw new Error("[CLIENT] There are no existing user's credentials")

  return context
}