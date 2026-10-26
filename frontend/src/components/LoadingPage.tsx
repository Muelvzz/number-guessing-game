import CpuIcon from "../assets/cpu-icon.svg?react"

// FIXME: Make the Loaidng Page responsive.

export default function LoadingPage() {
  return (
    <>
      <article className="fixed inset-0 z-100 bg-[#090d16] flex flex-col items-center justify-center p-6 transition-opacity duration-500">
          <div className="absolute inset-0 grid-pattern opacity-40"></div>
          <div className="absolute inset-0 scanline pointer-events-none opacity-40"></div>

          <div className="max-w-md w-full relative z-10 bg-black/90 border-2 border-card-bg/40 rounded-2xl p-8 shadow-2xl glow-cyan text-center space-y-6">

              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute bg-card-bg/20 rounded-full animate-ping ">
                    <CpuIcon className="text-light-blue size-7"/>
                  </div>
                  <div className="w-20 h-20 bg-black rounded-full border-2 border-card-bg flex items-center justify-center text-card-bg text-3xl">
                      <i className="fa-solid fa-microchip animate-pulse"></i>
                  </div>
              </div>

              <div className="space-y-1">
                  <h3 className="font-p2p text-lg tracking-wider text-white">H<span className="text-light-blue">i</span>L<span className="text-light-blue">O</span>_ENGINE</h3>
                  <div className="text-xs font-mono text-card-bg tracking-widest uppercase">INITIALIZING BINARY ARRAYS...</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 font-mono text-xs space-y-2 text-left">
                  <div className="flex justify-between text-slate-400">
                      <span>Search Range:</span>
                      <span id="loader-range-val" className="text-card-bg font-bold">[1, 1000]</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                      <span>Midpoint Guess:</span>
                      <span id="loader-mid-val" className="text-white font-bold">500</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                      <span>RNG Convergence:</span>
                      <span id="loader-status-val" className="text-amber-400">SEARCHING...</span>
                  </div>
              </div>

              {/* <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">CALCULATING O(log N)</span>
                      <span id="loader-percent" className="text-card-bg font-bold">0%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                      <div id="loader-bar" className="bg-linear-to-r from-card-bgDark to-card-bg h-full w-0 rounded-full transition-all duration-150"></div>
                  </div>
              </div> */}

              <div className="text-[11px] font-mono text-slate-500 pt-2 flex items-center justify-center gap-2">
                  <i className="fa-solid fa-spinner animate-spin text-card-bg"></i>
                  <span>Preparing high/lower arena matrix...</span>
              </div>
          </div>
      </article>
    </>
  )
}