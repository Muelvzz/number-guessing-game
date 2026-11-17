import type { SetStateAction } from "react";

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';
export type modalConfirmStatus = "NONE" | "CONTINUE" | "QUIT"

export type GameConfig = {
  id: number
  difficulty: string
  numOfAttempts: number
  isComplete: boolean
  timeTaken: number
  datePlayed: string

  setDifficulty: React.Dispatch<SetStateAction<DifficultyLevel>>
  setNumOfAttempts: React.Dispatch<SetStateAction<5 | 8 | 15>>
  setIsComplete: React.Dispatch<SetStateAction<boolean>>
  setTimeTaken: React.Dispatch<SetStateAction<number>>
}

export type DifficultConfigType = {
  id: number
  levelNumber: string
  name: DifficultyLevel
  rangeText: string
  attemptsText: string
  cardDescription: string
  panelDescription: string
  rangeBadge: string
  attempts: number
  maxRange: number
}