import type { SetStateAction } from "react"
import type React from "react"

type GamePlayProps = {
  numOfAttempts: number,
  setNumOfAttempts: React.Dispatch<SetStateAction<number>>
}

export default function GamePlay({numOfAttempts, setNumOfAttempts}: GamePlayProps) {
  return (
    <>
      <article className="min-h-screen bg-card-bg">
        <section className="flex flex-2 flex-col w-full">
          <div>
            <div></div>
            <div>
              <form action=""></form>
            </div>
            <div></div>
            <div></div>
          </div>
        </section>
        <section className="flex flex-1 bg-white/80 w-full">
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </section>
      </article>
    </>
  )
}