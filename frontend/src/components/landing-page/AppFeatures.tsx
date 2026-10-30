import StackIcon from "../../assets/stack-icon.svg?react"
import TrophyIcon from "../../assets/trophy-icon.svg?react"
import DiceIcon from "../../assets/dice-icon.svg?react"

type FeatureCard = {
  image: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string,
  description: string
  footCaption: string
}

const featurePayload: FeatureCard[] = [
  {
    image: StackIcon,
    title: "VARIOUS DIFFICULTIES",
    description: "Players get to choose any difficulty of their choice, whether it may be the Easy range (1-50) or the Extreme modes (1-10,000), explicitly designed to gauge your thinking speed and binary divide tactics.",
    footCaption: "RANGE: 1 TO 10,000",
  },
  {
    image: TrophyIcon,
    title: "VARIOUS DIFFICULTIES",
    description: "Players get to choose any difficulty of their choice, whether it may be the Easy range (1-50) or the Extreme modes (1-10,000), explicitly designed to gauge your thinking speed and binary divide tactics.",
    footCaption: "REAL-TIME RANKINGS"
  },
  {
    image: DiceIcon,
    title: "RNG-BASED GAMEPLAY",
    description: "The game utilizes a robust random number generator engine to ensure that players grind their brains for the correct outcome fairly on every single match.",
    footCaption: "FAIR SEED ALGORITHM"
  }
]

// FIXME: Improve the UI design flow
// FIXME: Add Web Responsiveness

export default function AppFeatures() {
  return (
    <>
      <article>
        <section className="py-20 bg-white relative">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
                
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                    <small className="text-xs font-mono font-bold tracking-widest text-light-blue uppercase bg-black inline-block px-3 py-1 rounded-md">
                        CORE GAME MECHANICS
                    </small>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Engineered for Logic, Speed & Precision
                    </h2>
                    <p className="text-slate-600 text-base">
                        HiLo turns simple numerical guessing into a high-stakes strategy arena. Here is what makes it addictive.
                    </p>
                </div>

                <div className="bg-white flex flex-col md:flex-row p-3 md:p-6 lg:p-10 rounded-2xl border-2 border-slate-200 shadow-xl w-full lg:w-2/3">
                    <div className="grid md:grid-cols-3 gap-x-2 md:gap-x-6 lg:gap-x-12">

                      {featurePayload.map((card, idx) => {
                        const IconComponent = card.image

                        return (
                          <>
                            <div key={idx} className="bg-light-blue hover:bg-brand-accentHover transition-all duration-300 p-8 rounded-2xl text-brand-dark flex flex-col justify-between shadow-lg hover:shadow-cyan-500/20 group transform hover:-translate-y-1">
                                <div>
                                  <div>
                                    <IconComponent className="text-black size-20 bg-black/10 rounded-lg p-4"/>
                                  </div>
                                    <div className="bg-brand-dark/10 rounded-2xl flex items-center justify-center mb-6 text-brand-dark group-hover:scale-110 transition-transform">
                                        <i className="fa-solid fa-layer-group text-3xl"></i>
                                    </div>
                                    <h4 className="font-bold mb-3 tracking-tight font-inter text-black">
                                        {card.title}
                                    </h4>
                                    <small className="text-black/80 font-mono">
                                        {card.description}
                                    </small>
                                </div>
                                <div className="mt-8 pt-4 border-t border-black/80 flex items-center justify-between font-bold font-mono text-black/80">
                                    <small>{card.footCaption}</small>
                                </div>
                            </div>
                          </>
                        )
                      })}

                    </div>
                </div>

            </div>
        </section>
      </article>
    </>
  )
}