import { createContext, useContext, useState } from "react";
import type { DifficultyLevel, GameConfig, MaxNumOfAttempts } from "../types/gameTypes";

export const GameContext = createContext<GameConfig | null>(null)
export const useGame = () => { return useContext(GameContext) }

export function GameProvider({children}) {
  const now = new Date()

  const [difficulty, setDifficulty] = useState<DifficultyLevel>("EASY")
  const [numOfAttempts, setNumOfAttempts] = useState<MaxNumOfAttempts>(5)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [timeTaken, setTimeTaken] = useState<number>(0)
  const datePlayed: string = now.toISOString()

  return (
    <GameContext.Provider value={{
      difficulty,
      numOfAttempts,
      isComplete,
      timeTaken,
      datePlayed,
      setDifficulty,
      setNumOfAttempts,
      setIsComplete,
      setTimeTaken
    }}>
      {children}
    </GameContext.Provider>
  )
}