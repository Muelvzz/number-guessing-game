import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CountDownModal from "../components/dashboard/game/CountdownModal"
import GameHeader from "../components/dashboard/game/GameHeader"
import GameTerminal from "../components/dashboard/game/GameTerminal"
import GameSideBar from "../components/dashboard/game/GameSideBar"
import { checkBackOrForward } from "../utils/checkBackOrForward"
import GameConfirmModal from "../components/dashboard/game/GameConfirmModal"
import type { modalConfirmStatus } from "../types/gameTypes"

export default function GamePlay() {
  const location = useLocation()
  const navigate = useNavigate()

  const {difficulty, maxAttempt, maxRange} = location.state
  const [time, setTime] = useState<number>(0)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [secondsLeft, setSecondsLeft] = useState<number>(3)
  const [userGuess, setUserGuess] = useState<number[]>([])
  const [attemptUsed, setGuessAttempts] = useState<number>(0)
  const isCountdownActive = secondsLeft > 0

  // Game Confirm Modal States
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState<boolean>(false)
  const [modalConfirmStatus, setModalConfirmStatus] = useState<modalConfirmStatus>("NONE")

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

  checkBackOrForward((direction: string) => {
    if (direction === "back" || direction === "forward") {
      setIsModalConfirmOpen(true)
    }
  })

  if (modalConfirmStatus === "QUIT") {
    navigate("/home")
  }

  return (
    <>
      {isCountdownActive && (<CountDownModal secondsLeft={secondsLeft} />)}

      <article className="bg-white text-black font-inter border-t-4 border-light-blue px-6 md:px-12 py-12">
        <GameHeader 
          maxRange={maxRange} 
          difficulty={difficulty}
        />
        <section className="mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-5">
          <GameTerminal 
            maxRange={maxRange} 
            maxAttempt={maxAttempt}
            isComplete={isComplete}
            time={time}
            difficulty={difficulty}
            attemptUsed={attemptUsed}
            setUserGuess={setUserGuess}
            setIsComplete={setIsComplete}
            setGuessAttempts={setGuessAttempts}
          />
          <GameSideBar 
            maxAttempt={maxAttempt} 
            attemptUsed={attemptUsed}
            userGuess={userGuess}
          />
        </section>
      </article>

      { isModalConfirmOpen && (
        <GameConfirmModal 
          setIsModalConfirmOpen={setIsModalConfirmOpen}
          setModalConfirmStatus={setModalConfirmStatus}
        />
      ) }
    </>
  )
}