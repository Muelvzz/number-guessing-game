import { useEffect, useState } from "react"
import { useUser } from "../../hooks/UserContext"
import { getOwnGames, type GameRecord } from "../../service/gameApi"
import type { DifficultyLevel } from "../../types/gameTypes"
import CpuIcon from "../../assets/cpu-icon.svg?react"
import { logoutUser, type LogoutUserOutputType } from "../../service/userApi"
import { showToast } from "../../utils/toastStore"
import { useNavigate } from "react-router-dom"

type DifficultyStats = {
  difficulty: DifficultyLevel
  games: number
  guesses: number
  wins: number
}

const difficulties: DifficultyLevel[] = ["EASY", "MEDIUM", "HARD"]

function getDifficultyStats(games: GameRecord[]): DifficultyStats[] {
  return difficulties.map((difficulty) => {
    const gamesAtDifficulty = games.filter((game) => game.difficulty === difficulty)

    return {
      difficulty,
      games: gamesAtDifficulty.length,
      guesses: gamesAtDifficulty.reduce((total, game) => total + game.num_attempts, 0),
      wins: gamesAtDifficulty.filter((game) => game.is_complete).length,
    }
  })
}

export default function UserProfile() {
  const { userData } = useUser()
  const navigate = useNavigate()
  const [games, setGames] = useState<GameRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadGames() {
      try {
        const result = await getOwnGames()
        if (isMounted) setGames(result)
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : String(loadError)
        if (isMounted) setError(message)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadGames()
    return () => {
      isMounted = false
    }
  }, [])

  const handleLogoutUser = async () => {
    const response: LogoutUserOutputType = await logoutUser()
    if (!response) return

    showToast("Successfully Logout", "To login, please fill the necessary fields on the Login Field.")
    setTimeout(() => {
      navigate("/")
    }, 2000)
  }

  const stats = getDifficultyStats(games)

  return (
    <article className="min-h-screen border-t-2 border-light-blue bg-white font-inter text-blue flex justify-center p-4 lg:p-12">

      <div className="w-full md:w-3/4 lg:w-4/5">
        <section className="lg:grid lg:grid-cols-8 items-start gap-7">
          <aside className="border-slate-200 col-span-2">
            <div className="bg-slate-50 p-4 flex flex-col gap-y-4">
              <div className="flex justify-center">
                <CpuIcon aria-hidden="true" className="text-light-blue bg-black rounded-full size-1/2 lg:size-full p-4"/>
              </div>
              <div>
                <h3 className="flex items-center font-bold">{userData.username || "Player"}</h3>
                <p>{userData.email || "JuanDelaCruz@gmail.com"}</p>
              </div>
              <div>
                <small className="mt-1 text-justify text-slate-700">I'm a Computer Science student from the Philippines, and I am seeking gaming opportunities and algorithmic challenges that will enhance my skillsets in the number field. </small>
              </div>
              <div>
                <button
                  onClick={handleLogoutUser}
                  className="bg-light-blue text-white w-full py-2 rounded-sm font-bold cursor-pointer"
                >Logout</button>
              </div>
            </div>

            <div className="border-t border-slate-200 flex flex-col text-center p-4">
              <h3 className="mt-1 font-bold">
                {isLoading ? "—" : games.length.toLocaleString()}
              </h3>
              <small className="mt-1 font-mono text-slate-500">Total Matches</small>
            </div>
          </aside>

          <section aria-labelledby="player-stats-title" className="col-span-6">
            <h4 className="border-b border-slate-800 pb-1  font-bold">Player Stats</h4>

            {error && (
              <p role="alert" className="border-b border-slate-200 py-4 text-sm text-red-700">
                Unable to load game stats: {error}
              </p>
            )}

            {stats.map((stat) => {
              const winRate = stat.games === 0 ? 0 : Math.round((stat.wins / stat.games) * 100)
              const averageAttempts = stat.games === 0 ? "0.0" : (stat.guesses / stat.games).toFixed(1)

              return (
                <div
                  key={stat.difficulty}
                  className="border-b border-slate-400 grid grid-cols-4 p-2 gap-x-2 lg:p-4 gap-y-8"
                >
                  <div className="items-center bg-light-blue/10 p-4 w-full">
                    <h6 className="font-bold">
                      {stat.difficulty}
                    </h6>
                  </div>

                  <div className="lg:px-2">
                    <p className="font-mono">
                      Total Guesses
                    </p>
                    <h6 className="font-bold">
                      {isLoading ? "—" : stat.guesses.toLocaleString()}
                    </h6>
                  </div>

                  <div className="lg:px-2">
                    <p className="font-mono">
                      Win Rate
                    </p>
                    <h6 className="font-bold">
                      {isLoading ? "—" : `${winRate}%`}
                    </h6>
                  </div>

                  <div className="lg:px-2">
                    <p className="font-mono">
                      Avg Attempts
                    </p>
                    <h6 className="font-bold">
                      {isLoading ? "—" : averageAttempts}
                    </h6>
                  </div>
              </div>
              )
            })}
          </section>
        </section>

        <footer className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3 font-mono text-[7px] uppercase tracking-[0.18em] text-slate-500">
          <span>HI / LO = HIGH / LOWER</span>
          <span>User Profile</span>
        </footer>
      </div>

    </article>
  )
}
