import type { SetStateAction } from "react";

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';
export type MaxNumOfAttempts = 5 | 8 | 15

export type DifficultyConfig = {
  id: DifficultyLevel;
  levelNumber: string;
  name: string;
  rangeText: string;
  attemptsText: string;
  cardDescription: string;
  panelDescription: string;
  rangeBadge: string;
  attempts: MaxNumOfAttempts
}

export type GameConfig = {
  id: number
  difficulty: string
  numOfAttempts: MaxNumOfAttempts
  isComplete: boolean
  timeTaken: number
  datePlayed: string

  setDifficulty: React.Dispatch<SetStateAction<DifficultyLevel>>
  setNumOfAttempts: React.Dispatch<SetStateAction<MaxNumOfAttempts>>
  setIsComplete: React.Dispatch<SetStateAction<boolean>>
  setTimeTaken: React.Dispatch<SetStateAction<number>>
}