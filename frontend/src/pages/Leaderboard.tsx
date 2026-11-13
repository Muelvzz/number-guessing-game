import { useEffect, useState } from "react"
import type { DifficultyLevel } from "../types/gameTypes"
import { getAllGame, type AllGameRecord } from "../service/gameApi"
import formatTime from "../utils/formatTime"
import TrophyIcon from "../assets/trophy-icon.svg?react"
import CpuIcon from "../assets/cpu-icon.svg?react"

export default function Leaderboard() {
  const [chosenDifficulty, setChosenDifficulty] = useState<DifficultyLevel>("EASY")
  const [allGameRecord, setAllGameRecord] = useState<AllGameRecord[] | null>(null)

  const buttonStyle: string = "font-mono py-2 px-8 cursor-pointer border-1 border-black/10 rounded-md"
  const activeButtonStyle: string = "font-mono py-2 px-8 cursor-pointer border-1 border-light-blue bg-black text-light-blue rounded-md"

  useEffect(() => {
    const fetchAllGameRecord = async(chosenDifficulty: DifficultyLevel) => {
      const payload: AllGameRecord[] = await getAllGame(chosenDifficulty)
      setAllGameRecord(payload)
    }
    fetchAllGameRecord(chosenDifficulty)
  }, [chosenDifficulty])

  if (!allGameRecord) return

  return (
    <>
      <article className="p-4 lg:p-12">

        <div>
          <div>
            <h1 className="font-mono font-bold">GLOBAL LEADERBOARD</h1>
            <div className="flex gap-x-4">
              <button 
                className={chosenDifficulty === "EASY" ? activeButtonStyle : buttonStyle}
                onClick={() => setChosenDifficulty("EASY")}
              >
                <p>EASY</p>
              </button>
              <button 
                className={chosenDifficulty === "MEDIUM" ? activeButtonStyle : buttonStyle}
                onClick={() => setChosenDifficulty("MEDIUM")}
              >
                <p>MEDIUM</p>
              </button>
              <button 
                className={chosenDifficulty === "HARD" ? activeButtonStyle : buttonStyle}
                onClick={() => setChosenDifficulty("HARD")}
              >
                <p>HARD</p>
              </button>
            </div>
          </div>
          <section className="mt-12">
            <div className="flex flex-col lg:grid lg:grid-cols-8 gap-x-8">
              <div className="col-span-6">
                <div className="w-full overflow-x-scroll">
                  <table className="w-full min-w-180 whitespace-nowrap">
                    <thead className="bg-black/90">
                      <tr className="grid grid-cols-10 text-white/75 py-2">
                        <th className="col-span-1">RANK</th>
                        <th className="col-span-6">PLAYER NAME</th>
                        <th className="col-span-1">DIFFICULTY</th>
                        <th className="col-span-1">TIME</th>
                        <th className="col-span-1">ATTEMPTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allGameRecord.map((gameRecord, idx) => (
                        <>
                          <tr
                            key={gameRecord.game_id}
                            className="grid grid-cols-10 text-center items-center py-2 border-2 border-slate-400/25"
                          >
                            <td className="font-bold col-span-1">
                              <h6>{idx + 1}</h6>
                            </td>
                            <td className="font-bold col-span-6">{gameRecord.owner.username}</td>
                            <td className="col-span-1">{gameRecord.difficulty}</td>
                            <td className="col-span-1">{formatTime(gameRecord.time)}</td>
                            <td className="font-bold col-span-1">{gameRecord.num_attempts}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>

                    <tfoot>
                      <tr className="grid grid-cols-5 items-center px-8 py-2 border-2 border-slate-400/25">
                        <td className="col-span-5">
                          <small>Showing {allGameRecord.length} highest ranked games</small>
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <aside className="col-span-2">
                <div>
                  <div className="bg-black/90 rounded-lg p-8">

                    <div className="flex justify-between items-center">
                      <div>
                        <small className="text-white/75 font-mono">HIGHEST RANKED GAME</small>
                      </div>
                      <div>
                        <TrophyIcon className="text-light-blue size-6"/>
                      </div>
                    </div>

                    <div className="font-mono flex items-end mt-8">
                      <span className="text-8xl text-light-blue">{allGameRecord[0].num_attempts || "??" }</span>
                      <h4 className="text-white">ATTEMPT</h4>
                    </div>

                    <div className="flex items-center gap-x-2 mt-4">
                      <div>
                        <CpuIcon aria-hidden="true" className="text-light-blue size-8"/>
                      </div>
                      <div>
                        <p className="text-white">{allGameRecord[0].owner.username}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>

      </article>
    </>
  )
}