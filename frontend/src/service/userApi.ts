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
): Promise<{ access_token: string } | null> {
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

      switch (response.status) {
        case 403:
          setSubmitError("Invalid login, please try again.")
          break
        case 429:
          setSubmitError("Too many request, please come back later.")
          break
        default:
          setSubmitError("Unable to login, please try again.")
      }
      setShowSubmitError(true)
      return null

    } else {
      const result = await response.json()
      setShowSubmitError(false)
      return { access_token: result.access_token }
    }

  } catch (error) {
    if (error instanceof Error) console.error(`[CLIENT] ${error.message}`)
    else console.error(`[CLIENT] Unknown Error: ${error}`)
    return null
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
): Promise<boolean> {
  const url: string = `${URL}/user/signup`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    credentials: "include"
  })

  try {

    if (!response.ok) {

      switch (response.status) {
        case 400:
          setSubmitError("Invalid Email, Password or Username, please try again.")
          break
        case 409:
          setSubmitError("That email or username already has an account.")
          break
        case 411:
          setSubmitError("Password value is too short")
          break
        case 413:
          setSubmitError("Email or Username value is too long")
          break
        case 422:
          setSubmitError("Email, Password or Username does not follow a specific format.")
          break
        case 429:
          setSubmitError("Too many request, please come back later.")
          break
        default:
          setSubmitError("Unable to register. Please try again.")
      }

      setShowSubmitError(true)
      return false

    } else {

      await response.json()
      setShowSubmitError(false)
      return true

    }

  } catch (error) {
    if (error instanceof Error) {
      console.error(`[CLIENT] ${error.message}`)
      return false
    }
    else {
      console.error(`[CLIENT] Unknown Error: ${error}`)
      return false
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