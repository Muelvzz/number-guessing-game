import ArrowDownIcon from "../../assets/down-arrow.svg?react"

const frequentlyAskList = [
  {
    title: "What is the optimal strategy for HiLo?",
    caption: "The mathematically optimal method is Binary Search. By always guessing the exact midpoint of your remaining candidate range, you eliminate half of all possible numbers on every turn, achieving a maximum logarithmic limit of guesses (e.g. 5 attempts for numbers between 1-100)."
  },
  {
    title: "How are secret numbers generated?",
    caption: "Secret numbers or random number are generated client-side which is then submitted as an HTTP POST request into the server when the game is finished."
  },
  {
    title: "Is HiLo free to play?",
    caption: "Yes! You can play infinitely for free. Creating an account unlocks rank tracking, leaderboard participation, badges, and competitive seasonal tournaments."
  },
  {
    title: "How can I support this?",
    caption: "You can support us by creating a constructive feedback - highlighting your suggestions, what are the things you like and don't like about the game into our CONTACT US page."
  }
]

export default function FreqAskQuest() {
  return (
    <>
      <section id="faq" className="py-20 text-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h3 className="text-3xl font-extrabold">Frequently Asked Questions</h3>
                  <p className="text-slate-500 text-sm mt-2">Everything you need to know about playing HiLo</p>
              </div>

              <div className="space-y-4">
                {frequentlyAskList.map((ask) => (
                  <>
                    <details key={ask.title} className="group border border-card-bg rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden bg-card-bg">
                        <summary className="flex justify-between items-center font-bold text-white cursor-pointer">
                            <p>{ask.title}</p>
                            <span className="transition group-open:rotate-180 text-white">
                                <ArrowDownIcon className="text-white"/>
                            </span>
                        </summary>
                        <p className="mt-3 text-white/50 text-sm leading-relaxed text-justify">{ask.caption}</p>
                    </details>
                  </>
                ))}
              </div>
          </div>
      </section>
    </>
  )
}