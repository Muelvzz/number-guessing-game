import type { DifficultyLevel } from "../types/gameTypes"
import { getToken } from "../utils/setToken"

const URL: string = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

type GamePayload = {
  is_complete: boolean
  num_attempts: number
  difficulty: DifficultyLevel
  time: number
}

export type GameRecord = {
  game_id: number
  is_complete: boolean
  num_attempts: number
  difficulty: DifficultyLevel
  time: number
  date_played: string
}

export type AllGameRecord = {
  game_id: number
  date_played: string
  is_complete: boolean
  num_attempts: number
  difficulty: DifficultyLevel
  time: number
  owner: {
    username: string
    email: string
  }
}

export async function getOwnGames(): Promise<GameRecord[]> {
  const token = getToken("access_token")
  const response = await fetch(`${URL}/game/mygame`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error(`[CLIENT] Failed to get game history: ${response.status} | ${response.statusText}`)
  }

  return response.json() as Promise<GameRecord[]>
}

export async function getAllGame(difficulty: DifficultyLevel): Promise<AllGameRecord[]> {
  const token = getToken("access_token")
  const queryPayload: string = new URLSearchParams({difficulty: difficulty.toLowerCase()}).toString()
  const url: string = `${URL}/game/all?${queryPayload}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    credentials: "include"
  })

  if (!response.ok) {
    throw new Error(`[CLIENT] Failed to get game history: ${response.status} | ${response.statusText}`)
  }

  return response.json() as Promise<AllGameRecord[]>
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