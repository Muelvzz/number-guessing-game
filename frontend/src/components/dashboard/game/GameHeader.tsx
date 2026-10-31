type GameHeaderProps = {
  maxRange: number
  difficulty: string
}

export default function GameHeader({maxRange, difficulty}: GameHeaderProps) {
  return (
    <>
      <section className="mx-auto mb-8">

        <div className="flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-3">
          <span className="w-2 h-2 bg-light-blue" />
          {difficulty} MODE / ROUND IN PROGRESS
        </div>

        <h1 className="font-inter font-bold uppercase leading-none">
          CLOSER WITH EVERY GUESS.
        </h1>

        <p className="text-xs text-slate-400 mt-2">
          The number is hiding between 0 and {maxRange}. Make your next move.
        </p>

      </section>
    </>
  )
}