// import { useNavigate } from "react-router-dom"

export default function NotFound() {

  return (
    <>
      <main className="flex flex-col justify-center items-center bg-card-bg">

          {/* <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-card-bg/10 rounded-full blur-3xl pointer-events-none"></div> */}

          <article className="flex flex-col justify-center">
            <div className="gap-12 flex flex-col justify-center items-center">

                <div className="lg:col-span-7 space-y-6 text-center flex flex-col justify-center items-center">
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono uppercase tracking-wider">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <span>ERROR 404: OUT OF BOUNDS</span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-p2p text-white text-glow tracking-tight">
                            404
                        </h1>
                        <p className="font-mono text-light-blue font-bold tracking-wide">
                            TARGET NOT IN SEARCH SPACE!
                        </p>
                    </div>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Looks like your requested page URL was <strong>too high</strong> or <strong>too low</strong>! It fell outside our indexed range.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                        <a href="index.html" className="w-full sm:w-auto px-8 py-4 bg-light-blue hover:bg-cyan-400 text-brand-dark font-mono font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-3 glow-cyan">
                            <i className="fa-solid fa-arrow-left"></i> RETURN TO MAIN ARENA
                        </a>
                        <button className="w-full sm:w-auto px-6 py-4 bg-card-bg hover:bg-slate-700 border border-slate-700 text-slate-200 font-mono font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2">
                            <i className="fa-solid fa-rotate-left text-slate-400"></i> GO BACK PREVIOUS PAGE
                        </button>
                    </div>

                </div>

            </div>
          </article>

      </main>
    </>
  )
}