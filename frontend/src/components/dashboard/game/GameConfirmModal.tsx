import CpuIcon from "../../../assets/cpu-icon.svg?react"
import type { modalConfirmStatus } from "../../../types/gameTypes"

type GameConfirmModalTypes = {
  isModalConfirmOpen: boolean
  setIsModalConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>
  modalConfirmStatus: modalConfirmStatus
  setModalConfirmStatus: React.Dispatch<React.SetStateAction<modalConfirmStatus>>
}

export default function GameConfirmModal({
  isModalConfirmOpen,
  setIsModalConfirmOpen,
  modalConfirmStatus,
  setModalConfirmStatus
}: GameConfirmModalTypes) {

  return (
    <>
      <article className="fixed inset-0 z-100 bg-black/50 flex flex-col items-center justify-center p-6 transition-opacity duration-500">
        <div className="max-w-lg w-full relative z-10 bg-card-bg border-2 border-card-bg/40 rounded-2xl p-8 shadow-2xl glow-cyan text-center space-y-6">

            <div className="relative w-full h-20 mx-auto flex items-center justify-center">
              <div className="absolute bg-white rounded-full border-b-4 border-red-500 p-4">
                <CpuIcon className="text-red-500 size-14"/>
              </div>
            </div>

            <div className="space-y-1 text-white">
              <h5 className="font-p2p">ABANDONING THE GAME?</h5>
              <small className="font-mono">Attempting to quit the game will not be saved.</small>
            </div>

            <div className="font-mono font-bold text-slate-500 pt-2 flex items-center justify-center gap-2">
              <button 
                className="text-white bg-green-500 py-2 px-4 rounded-lg cursor-pointer"
                onClick={() => {setIsModalConfirmOpen(false), setModalConfirmStatus("CONTINUE")}}
              >
                <p>KEEP PLAYING</p>
              </button>
              <button 
                className="text-white bg-red-500 py-2 px-4 rounded-lg cursor-pointer"
                onClick={() => {setIsModalConfirmOpen(false), setModalConfirmStatus("QUIT")}}
              >
                <p>QUIT GAME</p>
              </button>
            </div>

        </div>
      </article>
    </>
  )
}