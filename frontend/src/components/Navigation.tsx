import { Link } from "react-router-dom"

export default function Navigation() {
  const navButtonStyles: string = "rounded-lg border-2 border-solid border-light-blue text-md px-5 py-1 font-inter text-white cursor-pointer"

  return (
    <>
      <nav className="bg-black py-2">
        <section className="flex justify-between">
          <span></span>
          <span className="flex gap-x-5">
            <button className={ navButtonStyles }>
              <Link to="/login">LOGIN</Link>
            </button>
            <button className={ navButtonStyles }>
              <Link to="/register">REGISTER</Link>
            </button>
            <button className={ navButtonStyles }>
              <Link to="/contact-us">CONTACT US</Link>
            </button>
          </span>
        </section>
      </nav>
    </>
  )
}