import heroCaption from "../assets/hero-caption.png"

import Navigation from "../components/Navigation";
import { useState } from "react";

export default function ContactUs() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }
  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setMessage(e.target.value) }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const submitPayload = {
      name: name,
      email: email,
      message: message
    }

    console.log(`Payload: ${JSON.stringify(submitPayload, null, 2)}`)
  }

  const inputStyle = "bg-white rounded-md px-4 py-2"

  return (
    <>
      <Navigation />
      <main className="bg-blue h-full pb-10">
        <article>
          <section className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <img src={heroCaption} alt="Hero" className="w-3/4" />
            </div>
            <form onSubmit={ handleSubmit } className="w-1/2 bg-light-blue p-10 rounded-lg">
              <div className="flex flex-col mb-10 gap-y-5">
                <input type="text" value={ name } onChange={ handleName } placeholder="Name" className={ inputStyle } />
                <input type="text" value={ email } onChange={ handleEmail } placeholder="Email" className={ inputStyle } />
                <textarea id="comments" value={ message } onChange={ handleMessage } placeholder="Message" className={ inputStyle } rows={5} />
              </div>
              <button type="submit" className="bg-gray-400 px-10 py-2 rounded-md font-bold">Submit</button>
            </form>
          </section>
        </article>
      </main>
    </>
  )
}