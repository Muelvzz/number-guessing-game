import { useState, type SetStateAction } from "react"
import type React from "react"
import formatTime from "../../../utils/formatTime"
import generateRandomNumber from "../../../utils/generateRandomNumber"
import { addGame } from "../../../service/gameApi"
import type { DifficultyLevel } from "../../../types/gameTypes"
import { useNavigate } from "react-router-dom"

type GuessFeedback = "HIGHER" | "LOWER"

type GameTerminalProps = {
  maxRange: number
  attempts: number
  userGuess: number[]
  currentUserGuess: number
  isComplete: boolean
  time: number
  difficulty: DifficultyLevel

  setUserGuess: React.Dispatch<SetStateAction<number[]>>
  setCurrentUserGuess: React.Dispatch<SetStateAction<number>>
  setIsComplete: React.Dispatch<SetStateAction<boolean>>
}

export default function GameTerminal({
  maxRange, 
  attempts, 
  userGuess, 
  currentUserGuess, 
  isComplete,
  time,
  difficulty,
  setUserGuess, 
  setCurrentUserGuess,
  setIsComplete,
}: GameTerminalProps) {
  const displayTime: string = formatTime(time)
  const navigate = useNavigate()
  const [randomNumber, setRandomNumber] = useState(() => generateRandomNumber(maxRange));
  
  const [guessFeedback, setGuessFeedback] = useState<GuessFeedback>("LOWER")
  const [guessAttempts, setGuessAttempts] = useState<number>(0)

  console.log(`Random Number: ${randomNumber}`)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {setCurrentUserGuess(parseInt(e.target.value))}


  const handleUserSubmitNumber = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextAttempt: number = guessAttempts + 1
    setGuessAttempts(nextAttempt)
    setUserGuess([...userGuess, currentUserGuess])

    const payload = {
      is_complete: isComplete,
      num_attempts: nextAttempt,
      difficulty: difficulty,
      time: time
    }

    if (guessAttempts === attempts) {
      setIsComplete(false)
      const response = await addGame(payload)
      console.log(response)
    }

    if (currentUserGuess === randomNumber) {
      setIsComplete(true)
      const response = await addGame(payload)
      console.log(response)
      navigate("/home")
    }

    if (currentUserGuess > randomNumber) setGuessFeedback("HIGHER")
    if (currentUserGuess < randomNumber) setGuessFeedback("LOWER")
  }

  return (
    <>
      <section className="col-span-8 bg-card-bg text-white rounded-md overflow-hidden shadow-sm">

        {/* Terminal Header */}
        <div className="font-mono border-b border-slate-700 px-5 py-4 flex justify-between items-center text-[9px] text-slate-400 uppercase">

          <span>NUMBER TERMINAL / 0-{maxRange}</span>

          <span className="text-light-blue">
            ● AWAITING INPUT
          </span>

        </div>

        <div className="p-6">

          {/* Hidden Number */}
          <div className="flex justify-between items-start mb-6">

            <div>
              <small className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-2">
                THE HIDDEN NUMBER
              </small>

              <h1 className="text-5xl text-light-blue font-extrabold font-inter tracking-widest">
                {isComplete ? randomNumber : "??"}
              </h1>
            </div>

            <div className="text-right">
              <small className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-2">
                TIME SPENT
              </small>
              <h2 className="text-2xl font-mono">{displayTime}</h2>
            </div>

          </div>

          {/* Guess Input */}
          <div className="mb-5">

            <label className="block text-xs font-medium mb-2">
              Your next guess
            </label>

            <form className="flex gap-2" onSubmit={handleUserSubmitNumber}>

              <input
                type="number"
                placeholder="Enter your guess..."
                className="flex-1 min-w-0 bg-black border border-light-blue rounded-sm px-4 py-3 text-2xl font-mono text-white outline-none focus:ring-1 focus:ring-light-blue"
                value={currentUserGuess}
                onChange={handleInput}
              />

              <button
                type="submit"
                className="bg-light-blue hover:bg-cyan-400 text-black font-mono font-bold uppercase text-xs px-8 transition-colors"
              >
                GUESS
              </button>

            </form>

            <p className="text-[8px] font-mono text-slate-500 mt-2 uppercase">
              Enter a whole number from 0 to {maxRange} / Press enter to guess
            </p>

          </div>

          {/* Guess Feedback */}
          <div className="bg-light-blue text-black p-4 flex items-center gap-4">

            <span className="text-2xl">↑</span>

            <div>
              <h3 className="font-timmana text-xl uppercase leading-none">
                {guessFeedback === "HIGHER" ? "TOO HIGH" : "TOO LOW"}
              </h3>

              <p className="text-[9px] mt-1">
                {guessFeedback === "HIGHER" ? "Your guess is too high" : "Your guess is too low. You're getting closer"}
              </p>
            </div>

          </div>

        </div>

      </section>
    </>
  )
}