import { useState } from "react"
import Navigation from "../components/Navigation"
import SubmitImg from "../assets/top-right-arrow.svg?react"

export default function Register() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload = {
      email: email,
      password: password
    }
    console.log(`[CLIENT] payload: ${ JSON.stringify(payload, null, 2) }`)
  }

  return (
    <>
      <Navigation/>
      <main className="bg-blue h-full flex justify-center items-center">
        <article className="w-1/3">
          <section className="flex flex-col justify-center items-center gap-y-5">
            <div className="text-center">
              <h1 className="font-p2p text-light-blue text-4xl text-left">JOIN</h1>
              <h1 className="font-p2p text-white text-3xl">The Number Geeks</h1>
            </div>
            <form onSubmit={ handleSubmit } className="w-full flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                  <p className="text-white font-bold">Email Address</p>
                  <input 
                    type="email" value={ email } onChange={ handleEmail } 
                    className="bg-blue border-none w-full rounded-lg px-4 py-2"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <p className="text-white font-bold">Password</p>
                  <input 
                    type="password" value={ password } onChange={ handlePassword } 
                    className="bg-blue border-none w-full rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <div>
                <span></span>
                <span className="text-light-blue">Forgot Password</span>
              </div>
              <button 
                type="submit" className="bg-light-blue px-4 py-2 rounded-lg w-full 
                font-bold flex items-center justify-center gap-x-3 cursor-pointer"
              >
                <span>Sign In</span>
                <span>
                  <SubmitImg className="text-black"/>
                </span>
              </button>
            </form>
            <div>
              <small className="text-gray-500">Your next personal best - starts with one game.</small>
            </div>
          </section>
        </article>
      </main>
    </>
  )
}