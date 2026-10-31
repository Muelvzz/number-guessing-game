type GameSideBarProps = {
  attempts: number
  numAttempts: number
}

export default function GameSideBar({attempts, numAttempts}: GameSideBarProps) {
  return (
    <>
      <aside className="col-span-4 flex flex-col gap-4">

        {/* Attempts Remaining */}
        <section className="bg-slate-100 rounded-md p-5">

          <div className="flex justify-between items-center mb-3">

            <div>
              <small className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                ATTEMPTS LEFT
              </small>

              <p className="text-xs font-bold mt-1">
                Make them count.
              </p>
            </div>

            <div className="font-mono font-black text-3xl">
              {String(attempts).padStart(2, "0")}
              <span className="text-sm text-slate-400">
                {" "}/ {String(numAttempts).padStart(2, "0")}
              </span>
            </div>

          </div>

          {/* Dynamic Attempt Bars */}
          <div className="flex gap-1 h-2">

            {Array.from({ length: numAttempts }, (_, index) => (
              <div
                key={index}
                className={`flex-1 rounded-sm transition-colors duration-300 ${
                  index < attempts
                    ? "bg-light-blue"
                    : "bg-slate-300"
                }`}
              />
            ))}

          </div>

        </section>

        {/* Guess History */}
        <section className="border border-slate-200 rounded-md overflow-hidden">

          <div className="flex justify-between items-center p-4 border-b border-slate-200">

            <h3 className="text-sm font-bold">
              Guess history
            </h3>

            <span className="text-[8px] font-mono text-slate-400">
              GUESSES
            </span>

          </div>

          <div className="p-6 text-center text-xs text-slate-400">
            Your guesses will appear here.
          </div>

        </section>

        {/* Hint */}
        <div className="flex items-start gap-3 px-2 py-2">

          <span className="text-slate-400">♧</span>

          <p className="text-[10px] text-slate-400 leading-relaxed">
            Try the middle of your remaining range to rule out more numbers.
          </p>

        </div>

      </aside>
    </>
  )
}