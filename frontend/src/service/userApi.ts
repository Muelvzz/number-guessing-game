import type { SetStateAction } from "react"
import { getToken } from "../utils/setToken"

const URL: string = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

export type GetUserDataOutputType = {
  id: number
  username: string
  email: string
}

type UserPayload = {
  username?: string,
  email?: string,
  password: string
}

export type LogoutUserOutputType = {
  detail: string
}

export async function loginUserData(
  payload: UserPayload, 
  setSubmitError: React.Dispatch<SetStateAction<string>>, 
  setShowSubmitError: React.Dispatch<SetStateAction<boolean>>
): Promise<{ access_token: string }> {
  const url = `${URL}/user/login`
  const newPayload: URLSearchParams = new URLSearchParams(payload)

  try {

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: newPayload,
      credentials: "include"
    })

    if (!response.ok) {
      if (response.status === 403) {
        setSubmitError("Invalid Email or Password, please try again.")
        setShowSubmitError(true)
      }
      throw new Error(`[CLIENT] Response status: ${response.status} | ${response.statusText} `)
    }

    const result = await response.json()
    setShowSubmitError(false)

    return { access_token: result.access_token }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[CLIENT] ${error.message}`)
      throw error
    }
    else {
      console.error(`[CLIENT] Unknown Error: ${error}`)
      throw error
    }
  }
}

export async function validateAccessToken(token: string): Promise<boolean> {
  const response = await fetch(`${URL}/user/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    credentials: "include"
  })

  if (response.status === 401 || response.status === 403) return false

  if (!response.ok) {
    throw new Error(`[CLIENT] Session validation failed: ${response.status} | ${response.statusText}`)
  }

  return true
}

export async function registerUserData(
  payload: UserPayload,
  setSubmitError: React.Dispatch<SetStateAction<string>>, 
  setShowSubmitError: React.Dispatch<SetStateAction<boolean>>
) {
  const url: string = `${URL}/user/signup`

  try {

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      credentials: "include"
    })
    if (!response.ok) {
      if (response.status === 400) {
        setSubmitError("Invalid Email or Password, please try again.")
        setShowSubmitError(true)
      }
      throw new Error(`[CLIENT] Response status: ${response.status} | ${response.statusText} `)
    }

    const result = await response.json()
    setShowSubmitError(false)
    return result

  } catch (error) {
    if (error instanceof Error) {
      console.error(`[CLIENT] ${error.message}`)
      throw error
    }
    else {
      console.error(`[CLIENT] Unknown Error: ${error}`)
      throw error
    }
  }
}

export async function getUserData(): Promise<GetUserDataOutputType> {
  const url: string = `${URL}/user/me`
  const token = getToken("access_token")

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    credentials: "include"
  })

  if (!response.ok) {
    throw new Error(`[CLIENT] Failed to get user data: ${response.status} | ${response.text}`)
  }

  const body: { payload: GetUserDataOutputType } = await response.json()
  return body.payload
}

export async function logoutUser(): Promise<LogoutUserOutputType> {
  const url: string = `${URL}/user/logout`
  const token: string = getToken("access_token")

  const response: Response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    credentials: "include"
  })

  if (!response.ok) {
    throw new Error(`[CLIENT] Failed to get user data: ${response.status} | ${response.text}`)
  }

  const body: LogoutUserOutputType = await response.json()
  return body

}