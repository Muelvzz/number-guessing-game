import decisionIcon from "../assets/decision-icon.png"
import diceIcon from "../assets/dice-icon.png"
import questionIcon from "../assets/question-icon.png"

type InfoProp = {
  img: string,
  title: string,
  caption: string
}

const infoData: InfoProp[] = [
  {
    img: questionIcon,
    title: "VARIOUS DIFFICULTIES",
    caption: "Players get to choose any difficulty of their choice, whether it may be the Easy one or the Hard one, just to gauge their minds’ thinking ability. "
  },
  {
    img: decisionIcon,
    title: "PLAYER LEADERBOARD",
    caption: "A real-time player leaderboard is made available for players to see how fast they beat each difficulty."
  },
  {
    img: diceIcon,
    title: "RING BASED GAMEPLAY",
    caption: "The game utilizes a random number generator gameplay to ensure that players grind their brains for the correct answer."
  }
]

export default function LandingPage() {
  const navButtonStyles: string = "rounded-lg border-2 border-solid border-light-blue text-md px-5 py-1 font-inter text-white cursor-pointer"

  return (
    <>
      <nav className="bg-black py-2">
        <section className="flex justify-between">
          <span></span>
          <span className="flex gap-x-5">
            <button className={ navButtonStyles }>LOGIN</button>
            <button className={ navButtonStyles }>REGISTER</button>
            <button className={ navButtonStyles }>CONTACT US</button>
          </span>
        </section>
      </nav>
      <main className="bg-blue h-full text-white flex flex-col items-center justify-center">
        <article>
          <section>
            <div></div>
            <div className="py-10">
              <div className="flex flex-col md:p-24 lg:p-0 lg:grid lg:grid-cols-3 gap-x-15 gap-y-10">
                {infoData.map((info, idx) => (
                  <div className="rounded-xl border-5 border-solid border-black flex flex-col px-10 py-5 gap-y-5 justify-center items-start" key={ idx }>
                    <span>
                      <img src={ info.img } alt={ info.title } className="w-24" />
                    </span>
                    <div className="flex flex-col gap-y-3">
                      <h3 className="font-bold text-xl">{ info.title }</h3>
                      <p>{ info.caption }</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  )
}