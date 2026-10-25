import type { SetStateAction } from "react"
import ControllerIcon from "../../assets/controller-icon.svg?react"
import PlayIcon from "../../assets/play-icon.svg?react"
import TopRightIcon from "../../assets/top-right-arrow.svg?react"

// TODO: Create multiple mappings to reduce redundantness

export default function HeroSection({setShowModal}: {setShowModal: React.Dispatch<SetStateAction<"Login" | "Register" | "None">>}) {
  return (
    <>
      <article className="w-full flex flex-col justify-center items-center">
        <section className="bg-brand-dark text-white overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 flex flex-col justify-center items-center gap-y-5 lg:w-3/4">

          <div className="mb-8">
            <div className="flex gap-x-3 items-center bg-card-bg py-1 px-6 rounded-full border border-light-blue">
              <span>
                <ControllerIcon className="text-light-blue"/>
              </span>
              <span className="text-light-blue font-mono">
                <small>THE ULTIMATE HIGH / LOWER CHALLENGE</small>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <span className="font-extrabold text-center leading-none">
              <h1>WELCOME, <br /> NUMBER <span className="text-light-blue">GEEKS!</span></h1>
            </span>
            <div className="bg-card-bg/80 border-l-4 border-light-blue p-4 rounded-r-lg max-w-2xl mx-auto lg:mx-0">
                <p className="font-mono text-light-blue-300/90 tracking-wide">
                    HILO (HIGH / LOWER) — A GAME MADE FOR NUMBER GEEKS LIKE YOU
                </p>
            </div>
            <p className="text-white font-inter text-center leading-relaxed max-w-xl mx-auto lg:mx-0">
                Put your analytical intuition and binary search skills to the ultimate test. Outsmart random number generators, minimize your attempt counts, and dominate the global leaderboards in real time.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                className="w-full sm:w-auto px-8 py-4 bg-light-blue text-black font-mono font-bold text-base rounded-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
                onClick={() => setShowModal("Login")}  
              >
                  <span>
                    <PlayIcon className="text-black"/>
                  </span>
                  <i className="fa-solid fa-play"></i> START PLAYING NOW
              </button>
              <button 
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-brand-accent text-white font-semibold text-base rounded-xl transition-all flex items-center justify-center gap-2"
                onClick={() => setShowModal("Register")}  
              >
                  <span>Create Free Account</span>
                  <i className="fa-solid fa-arrow-right text-brand-accent"></i>
                  <span>
                    <TopRightIcon className="text-light-blue text-xl"/>
                  </span>
              </button>
          </div>
          <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 text-center lg:text-left w-full">
              <div>
                  <h4 className="font-mono font-bold text-white">O(log n)</h4>
                  <small className="text-slate-400">Optimal Comsmalllexity</small>
              </div>
              <div>
                  <h4 className="font-mono font-bold text-light-blue">100%</h4>
                  <small className="text-slate-400">Fair RNG Algorithm</small>
              </div>
              <div>
                  <h4 className="font-mono font-bold text-white">24/7</h4>
                  <small className="text-slate-400">Live Leaderboard</small>
              </div>
          </div>

        </section>
      </article>
    </>
  )
}