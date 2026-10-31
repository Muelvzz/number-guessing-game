import type { SetStateAction } from "react";

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';
type MaxNumOfAttempts = 5 | 8 | 15

export type GameConfig = {
  id: number
  difficulty: string
  numOfAttempts: number
  isComplete: boolean
  timeTaken: number
  datePlayed: string

  setDifficulty: React.Dispatch<SetStateAction<DifficultyLevel>>
  setNumOfAttempts: React.Dispatch<SetStateAction<MaxNumOfAttempts>>
  setIsComplete: React.Dispatch<SetStateAction<boolean>>
  setTimeTaken: React.Dispatch<SetStateAction<number>>
}