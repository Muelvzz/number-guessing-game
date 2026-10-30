import type { SetStateAction } from "react"

// TODO: Add a hover animations at the LOGIN and REGISTER button
// TODO: Add interaction of the Middle Tab bar
// TODO: Provide a mobile UI of the navigation
// FIXME: Improve the UI design flow

type ShowModalProps = {
  setShowModal: React.Dispatch<SetStateAction<"None" | "Login" | "Register">>
}

export default function Navigation({setShowModal}: ShowModalProps): React.ReactNode {
  const loginButtonStyle: string = "rounded-lg border-2 border-solid border-light-blue text-md px-6 py-2 font-inter text-light-blue font-bold cursor-pointer text-blue"
  const registerButtonStyle: string = "rounded-lg border-2 border-solid border-light-blue text-md px-6 py-2 font-inter text-blue cursor-pointer font-bold bg-light-blue"

  return (
    <>
      <nav className="bg-[#181d27] py-5 w-full">
        <section className="grid grid-cols-3 w-full items-center">
          <div>
            <span className="px-3 py-2 rounded-lg border border-slate-700">
                <span className="font-p2p tracking-wider text-white">
                    H<span className="text-light-blue relative inline-block">i<span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span></span>L<span className="text-light-blue">O</span>
                </span>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <ul className="flex justify-between text-white font-inter gap-x-5 text-lg">
              <li>Leaderboard</li>
              <li>FAQ</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="flex gap-x-5 justify-end">
            <button 
              className={ loginButtonStyle }
              onClick={() => setShowModal("Login")}
            >
              LOGIN
            </button>
            <button 
              className={ registerButtonStyle }
              onClick={() => setShowModal("Register")}
            >
              REGISTER
            </button>
          </div>
        </section>
      </nav>
    </>
  )
}