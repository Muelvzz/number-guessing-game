import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
        <article className="w-full max-w-xl overflow-hidden rounded-lg border border-blue shadow-sm">
          <section aria-labelledby="not-found-title" className="text-center">
            <div className="bg-blue px-6 py-10">
              <p
                aria-hidden="true"
                className="text-7xl font-bold tracking-tight text-white sm:text-8xl"
              >
                404
              </p>
            </div>
            <div className="bg-white px-6 pt-8">
              <h1
                id="not-found-title"
                className="text-3xl font-semibold text-black sm:text-4xl"
              >
                Page Not Found
              </h1>
            </div>
 
            <div className="bg-white px-6 pt-4">
              <p className="mx-auto max-w-md text-base leading-relaxed text-black/70 sm:text-lg">
                It seems that we can’t find the page that you’re looking for.
                Try going back to the previous page or contact us for more
                information.
              </p>
            </div>
 
            <div className="bg-white px-6 pb-10 pt-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-md bg-blue px-6 py-2.5 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Go to your Page Feed
              </button>
            </div>
          </section>
        </article>
      </main>
    </>
  )
}