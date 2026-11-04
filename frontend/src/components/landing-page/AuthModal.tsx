import { useState, type SetStateAction } from "react"
import { getUserData, loginUserData, registerUserData } from "../../service/userApi"
import { useAuth } from "../../hooks/AuthContext"
import RingCircle from "../../assets/ring-circle-icon.svg?react"
import LoadingPage from "../LoadingPage"
import type { showModalType } from "../../types/userTypes"
import { showToast } from "../../utils/toastStore"
import { useUser } from "../../hooks/UserContext"

type AuthModalProps = { 
  showModal: string,
  setShowModal: React.Dispatch<SetStateAction<showModalType>>
}

// TODO: Web Responsiveness
// TODO: Create Custom Messages of the Login and Register
// FIXME: Refactor the file to reduce the number of lines of code

export default function AuthModal({showModal, setShowModal}: AuthModalProps): React.ReactNode {

  const auth = useAuth()

  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [pressSubmit, setPressSubmit] = useState<boolean>(false)
  const [showSubmitError, setShowSubmitError] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleUserData } = useUser()

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}
  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {setMessage(e.target.value)}

  if (!auth) throw new Error("[CLIENT] Login must be rendered within AuthProvider")

  const handleSubmitLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setPressSubmit(true)
    setShowSubmitError(false)
    setSubmitError("")

    e.preventDefault()
    const payload = {
      username: email,
      password: password
    }
    
    try {
      const loginResult = await loginUserData(payload, setSubmitError, setShowSubmitError)
      const result = await getUserData(loginResult.id)
      handleUserData(result)

      showToast("Login Successful", `Welcome Back ${email}!`)
      setIsLoading(true)
      await auth.login(loginResult.access_token)
      
    } catch (error) {
      if (!showSubmitError) {
        setSubmitError("Unable to log in. Please try again.")
        setShowSubmitError(true)
      } else {
        console.error(`[CLIENT] Unable to log in: ${error}`)
      }
    } finally {
      setPressSubmit(false)
      setIsLoading(false)
    }
  }

  const handleSubmitRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setPressSubmit(true)
    setShowSubmitError(false)

    e.preventDefault()
    const payload = {
      username: username,
      email: email,
      password: password
    }

    try {
      await registerUserData(payload, setSubmitError, setShowSubmitError)
      showToast("Account Created!", "Please re-enter your credentials into the Login one more time.")
      setIsLoading(true)
    } catch (error) {
      if (!showSubmitError) {
        setSubmitError("Unable to register. Please try again")
        setShowSubmitError(true)
      } else {
        console.error(`[CLIENT] Unable to log in: ${error}`)
      }
    } finally {
      setPressSubmit(false)
      setIsLoading(false)
    }
  }

  const handleSubmitContactUs = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setPressSubmit(true)
    setShowSubmitError(false)

    e.preventDefault()
    console.log("Email Sent")
    setPressSubmit(false)
  }

  if (isLoading) return <LoadingPage />

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
                  <form onSubmit={handleSubmitLogin} className="space-y-4">
                      <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">EMAIL</label>
                          <input 
                            type="text" 
                            required 
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none text-white font-mono"
                            placeholder="hilogeeks@gmail.com"
                            value={email}
                            onChange={handleEmail}
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">PASSWORD</label>
                          <input 
                            type="password" 
                            required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none text-white font-mono" 
                            placeholder="••••••••"
                            value={password}
                            onChange={handlePassword}
                          />
                      </div>

                      { showSubmitError && 
                        <div className="w-full text-center">
                          <small className="text-red-500 underline text-center">{submitError}</small>
                        </div> }

                      <button type="submit" className="w-full bg-light-blue text-black font-mono font-bold py-3 rounded-lg uppercase tracking-wider text-sm transition-all flex justify-center items-center gap-x-2">
                          { pressSubmit && <RingCircle className="text-white animate-spin size-5" viewBox="0 0 24 24"/> }
                          {pressSubmit ? "PROCESSING" : "LOG IN"}
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
                  <form onSubmit={handleSubmitRegister} className="space-y-4">
                      <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">USERNAME</label>
                          <input 
                            type="text" 
                            required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none text-white font-mono" 
                            placeholder="NumberGeek42"
                            value={username}
                            onChange={handleUsername}
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">EMAIL ADDRESS</label>
                          <input 
                            type="email" 
                            required 
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none text-white font-mono" 
                            placeholder="hilogeeks@gmail.com"
                            value={email}
                            onChange={handleEmail}  
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">PASSWORD</label>
                          <input 
                            type="password" 
                            required 
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none text-white font-mono" 
                            placeholder="••••••••"
                            value={password}
                            onChange={handlePassword}
                          />
                      </div>
                      <button type="submit" className="w-full bg-light-blue text-black font-mono font-bold py-3 rounded-lg uppercase tracking-wider text-sm transition-all flex justify-center items-center gap-x-2">
                          { pressSubmit && <RingCircle className="text-white animate-spin size-5" viewBox="0 0 24 24"/> }
                          {pressSubmit ? "PROCESSING" : "CREATE ACCOUNT"}
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

  if (showModal === "Contact Us") {
    return (
      <>
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card-bg border-2 border-slate-700 rounded-2xl w-full max-w-md p-6 sm:p-8 text-white relative shadow-2xl">
              <button onClick={() => setShowModal("None")} className="absolute top-4 right-4 text-white hover:text-white text-lg cursor-pointer">
                  <p>x</p>
              </button>
              <div className="text-center mb-5">
                  <span className="font-p2p text-xl text-white">CONTACT US</span>
                  <p className="text-slate-400 mt-1">Have feedback or questions? Send us a line!</p>
              </div>
              <form onSubmit={handleSubmitContactUs} className="space-y-4">
                  <div>
                      <label className="font-mono text-slate-300 mb-1 text-xs">EMAIL</label>
                      <input 
                        type="email" 
                        required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none text-white font-mono" 
                        placeholder="hilogeeks@gmail.com"
                        value={email}
                        onChange={handleEmail}
                      />
                  </div>
                  <div>
                      <label className="font-mono text-slate-300 mb-1 text-xs">MESSAGE</label>
                      <textarea 
                        rows={3} 
                        required 
                        className="w-full bg-slate-900 border border-slate-700 focus:border-brand-accent rounded-lg p-3 text-sm outline-none text-white font-mono" 
                        placeholder="How can we help?"
                        value={message}
                        onChange={handleMessage}
                      ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-light-blue text-black font-mono font-bold py-3 rounded-lg uppercase tracking-wider text-sm transition-all flex justify-center items-center gap-x-2">
                      { pressSubmit && <RingCircle className="text-white animate-spin size-5" viewBox="0 0 24 24"/> }
                      {pressSubmit ? "PROCESSING" : "SEND A MESSAGE"}
                  </button>
              </form>
            </div>
        </div>
      </>
    )
  }
}