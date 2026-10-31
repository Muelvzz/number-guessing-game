import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import CountDownModal from "../components/dashboard/game/CountdownModal"
import GameHeader from "../components/dashboard/game/GameHeader"
import GameTerminal from "../components/dashboard/game/GameTerminal"
import GameSideBar from "../components/dashboard/game/GameSideBar"

export default function GamePlay() {
  const location = useLocation()
  const {difficulty, numAttempts, maxRange} = location.state
  const [attempts, setAttempts] = useState<number>(numAttempts)
  const [time, setTime] = useState<number>(0)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [secondsLeft, setSecondsLeft] = useState<number>(3)
  const [userGuess, setUserGuess] = useState<number[]>([])
  const [currentUserGuess, setCurrentUserGuess] = useState<number>(0)
  const isCountdownActive = secondsLeft > 0

  // Countdown Timer
  useEffect(() => {
    if (secondsLeft <= 0) return

    const timerId = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timerId)
  }, [secondsLeft])

  // Timer
useEffect(() => {
  if (isCountdownActive || isComplete) return

  const intervalId = setInterval(() => {
    setTime((prev) => prev + 1)
  }, 1000)

  return () => clearInterval(intervalId)
}, [isCountdownActive, isComplete])

  return (
    <>
      {isCountdownActive && (<CountDownModal secondsLeft={secondsLeft} />)}

      <article className="bg-white text-black font-inter border-t-4 border-light-blue px-12 py-12">
        <GameHeader 
          maxRange={maxRange} 
          difficulty={difficulty}
        />
        <section className="mx-auto grid grid-cols-12 gap-5">
          <GameTerminal 
            maxRange={maxRange} 
            attempts={attempts}
            userGuess={userGuess}
            currentUserGuess={currentUserGuess}
            isComplete={isComplete}
            time={time}
            difficulty={difficulty}
            setUserGuess={setUserGuess}
            setCurrentUserGuess={setCurrentUserGuess}
            setIsComplete={setIsComplete}
          />
          <GameSideBar attempts={attempts} numAttempts={numAttempts} />
        </section>
      </article>
    </>
  )
}