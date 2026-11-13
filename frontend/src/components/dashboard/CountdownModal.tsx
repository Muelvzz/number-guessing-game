export default function CountDownModal({secondsLeft}: {secondsLeft: number}) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-white p-10 text-center">
          <h1 className="text-6xl font-black font-mono">
            {secondsLeft}
          </h1>
          <p className="font-timmana text-2xl">GET READY!</p>
        </div>
      </div>
    </>
  )
}