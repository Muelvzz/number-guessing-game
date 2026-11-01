import { type SetStateAction, useState } from "react"

type ShowModalProps = {
  setShowModal: React.Dispatch<SetStateAction<"None" | "Login" | "Register" | "Contact Us">>
}

export default function Navigation({setShowModal}: ShowModalProps): React.ReactNode {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const loginButtonStyle: string = "rounded-lg border-2 border-solid border-light-blue px-6 py-2 font-inter text-light-blue font-bold cursor-pointer text-blue hover:bg-light-blue/25 transition duration-300"
  const registerButtonStyle: string = "rounded-lg border-2 border-solid border-light-blue px-6 py-2 font-inter text-blue cursor-pointer font-bold bg-light-blue hover:bg-light-blue/75 hover:border-light-blue/75 transition duration-300"

  return (
    <>
      <nav className="bg-[#181d27] py-5 w-full relative">
        <section className="grid grid-cols-2 md:grid-cols-3 w-full items-center">
          <div>
            <span className="px-3 py-2 rounded-lg border border-slate-700">
                <span className="font-p2p tracking-wider text-white">
                    H<span className="text-light-blue relative inline-block">i<span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span></span>L<span className="text-light-blue">O</span>
                </span>
            </span>
          </div>

          <div className="hidden md:flex justify-start items-center">
            <ul className="flex justify-between text-white font-inter gap-x-5 text-lg">
              <li className="cursor-pointer hover:text-light-blue transition">Leaderboard</li>
              <li className="cursor-pointer hover:text-light-blue transition">FAQ</li>
              <li className="cursor-pointer hover:text-light-blue transition">
                <a onClick={() => setShowModal("Contact Us")}>Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Desktop Auth Buttons (Hidden on small screens) */}
          <div className="hidden md:flex gap-x-3 lg:gap-x-5 justify-end">
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

          {/* 2. Hamburger Button (Visible only on mobile) */}
          <div className="flex md:hidden justify-end">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </section>

        {/* 3. Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#181d27] border-t border-slate-800 py-5 px-6 flex flex-col gap-y-4 shadow-xl z-50">
            <ul className="flex flex-col text-white text-center font-inter gap-y-4 text-lg">
              <li className="cursor-pointer hover:text-light-blue transition" onClick={() => setIsMobileMenuOpen(false)}>Leaderboard</li>
              <li className="cursor-pointer hover:text-light-blue transition" onClick={() => setIsMobileMenuOpen(false)}>FAQ</li>
              <li className="cursor-pointer hover:text-light-blue transition" onClick={() => setIsMobileMenuOpen(false)}>
                <a onClick={() => setShowModal("Contact Us")}>Contact Us</a>
              </li>
            </ul>
            <div className="flex gap-x-3 justify-center items-center pt-3 border-t border-slate-800">
                <button 
                  className={`${loginButtonStyle} text-center`}
                  onClick={() => { setShowModal("Login"); setIsMobileMenuOpen(false); }}
                >
                  LOGIN
                </button>
                <button 
                  className={`${registerButtonStyle} text-center`}
                  onClick={() => { setShowModal("Register"); setIsMobileMenuOpen(false); }}
                >
                  REGISTER
                </button>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}