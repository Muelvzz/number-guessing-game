import type { SetStateAction } from "react"

type AuthModalProps = { 
  showModal: string,
  setShowModal: React.Dispatch<SetStateAction<"None" | "Login" | "Register">>
}

export default function AuthModal({showModal, setShowModal}: AuthModalProps): React.ReactNode {
  if (showModal === "Login") {
    return (
      <>
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card-bg border-2 border-slate-700 rounded-2xl w-full max-w-md p-6 sm:p-8 text-white relative shadow-2xl">
              <button onClick={() => setShowModal("None")} className="absolute top-4 right-4 text-white hover:text-white text-lg cursor-pointer">
                  <p>x</p>
              </button>
              <div className="modal-content space-y-5">
                  <div className="text-center">
                      <span className="font-p2p text-2xl text-white">H<span className="text-light-blue">i</span>L<span className="text-light-blue">O</span> LOGIN</span>
                      <p className="text-xs text-slate-400 mt-1">Welcome back, geek! Access your profile.</p>
                  </div>
                  <form className="space-y-4">
                      <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">EMAIL / USERNAME</label>
                          <input type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none text-white font-mono" placeholder="hilogeeks@gmail.com"/>
                      </div>
                      <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">PASSWORD</label>
                          <input type="password" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none text-white font-mono" placeholder="••••••••"/>
                      </div>
                      <button type="submit" className="w-full bg-light-blue text-black font-mono font-bold py-3 rounded-lg uppercase tracking-wider text-sm transition-all">
                          LOG IN
                      </button>
                  </form>
                  <div className="text-center text-xs text-slate-400">
                      Don't have an account? <a href="#" onClick={() => setShowModal("Register")} className="text-light-blue hover:underline">Register now</a>
                  </div>
              </div>
            </div>
        </div>
      </>
    )
  }

  if (showModal === "Register") {
    return (
      <>
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card-bg border-2 border-slate-700 rounded-2xl w-full max-w-md p-6 sm:p-8 text-white relative shadow-2xl">
              <button onClick={() => setShowModal("None")} className="absolute top-4 right-4 text-white hover:text-white text-lg cursor-pointer">
                  <p>x</p>
              </button>
              <div className="modal-content space-y-5">
                  <div className="text-center">
                      <span className="font-p2p text-2xl text-white">JOIN H<span className="text-light-blue">i</span>L<span className="text-light-blue">O</span></span>
                      <p className="text-xs text-slate-400 mt-1">Create your gamer profile & track stats.</p>
                  </div>
                  <form className="space-y-4">
                      <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">USERNAME</label>
                          <input type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none text-white font-mono" placeholder="NumberGeek42"/>
                      </div>
                      <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">EMAIL ADDRESS</label>
                          <input type="email" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none text-white font-mono" placeholder="hilogeeks@gmail.com"/>
                      </div>
                      <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">PASSWORD</label>
                          <input type="password" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none text-white font-mono" placeholder="••••••••"/>
                      </div>
                      <button type="submit" className="w-full bg-light-blue text-black font-mono font-bold py-3 rounded-lg uppercase tracking-wider text-sm transition-all">
                          CREATE ACCOUNT
                      </button>
                  </form>
                  <div className="text-center text-xs text-slate-400">
                      Already registered? <a href="#" onClick={() => setShowModal("Login")} className="text-light-blue hover:underline">Log in here</a>
                  </div>
              </div>
            </div>
        </div>
      </>
    )
  }

  return
}