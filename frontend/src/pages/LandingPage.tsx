import { useState } from "react"

import Navigation from "../components/landing-page/Navigation"
import AuthModal from "../components/landing-page/AuthModal"
import HeroSection from "../components/landing-page/HeroSection"
import AppFeatures from "../components/landing-page/AppFeatures"
import Footer from "../components/landing-page/Footer"
import FreqAskQuest from "../components/landing-page/FreqAskQuest"
import type { showModalType } from "../types/userTypes"

// FIXME: Refactor the file by reducing the number of lines of code that exist with it.
// TODO: Web Responsiveness of the Page
// FIXME: Improve the UI design flow

export default function LandingPage() {
  const [showModal, setShowModal] = useState<showModalType>("None")

  return (
    <>
      <Navigation setShowModal={setShowModal}/>
      <main className="bg-blue h-full text-white flex flex-col">
        <HeroSection setShowModal={setShowModal}/>
        <AppFeatures />
        <FreqAskQuest />
      </main>
      <Footer />

      <AuthModal 
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  )
}