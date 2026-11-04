import type { SetStateAction } from "react"

const URL: string = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

export type getUserDataOutputType = {
  id: number
  username: string
  email: string
}

type UserPayload = {
  username?: string,
  email?: string,
  password: string
}

export async function loginUserData(
  payload: UserPayload, 
  setSubmitError: React.Dispatch<SetStateAction<string>>, 
  setShowSubmitError: React.Dispatch<SetStateAction<boolean>>
): Promise<{ access_token: string, id: string }> {
  const url = `${URL}/user/login`
  const newPayload = new URLSearchParams(payload)

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

    return { access_token: result.access_token, id: result.id }
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

export async function getUserData(id: string): Promise<getUserDataOutputType> {
  const numId: number = parseInt(id)
  const url: string = `${URL}/user/${numId}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`[CLIENT] Response status: ${response.status}`)
    }

    const result: getUserDataOutputType = await response.json()
    return result

  } catch (error: unknown) {

    if (error instanceof Error) {
      console.error(`[CLIENT] ${error.message}`)
    }
    else {
      console.error(`[CLIENT] Unknown Error: ${error}`)
      throw error
    }

    return { id: 0, email: "", username: "" }
  }
}