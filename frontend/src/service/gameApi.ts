import type { DifficultyLevel } from "../types/gameTypes"
import { getToken } from "../utils/setToken"

// FIXME: Match the casing from the backend and the frontend

const URL: string = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

type GamePayload = {
  is_complete: boolean
  num_attempts: number
  difficulty: DifficultyLevel
  time: number
}

export async function addGame(payload: GamePayload) {
  const url: string = `${URL}/game/`
  const token: string = getToken("access_token")
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? {Authorization: `Bearer ${token}`} : {})
      },
      body: JSON.stringify(payload),
      credentials: "include"
    })

    if (!response.ok) {
      throw new Error(`[CLIENT] Response status: ${response.status} | ${response.statusText}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[CLIENT] Unknown Error: ${error}`)
      throw error
    }
  }
}