import { useEffect } from "react";
import { useToastStore, hideToast } from "../utils/toastStore";

export default function PopUpModal() {
  const { isOpen, title, message, status } = useToastStore();

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-500 pointer-events-none flex flex-col items-center gap-3 w-full max-w-md px-4">
      <div
        className={`pointer-events-auto w-full bg-[#181d27]/95 backdrop-blur-md border border-[#00d8f0]/40 text-white rounded-xl shadow-2xl shadow-[#00d8f0]/10 overflow-hidden transform transition-all duration-300 ease-out ${
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-8 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#00d8f0]/10 border border-[#00d8f0]/30 flex items-center justify-center text-[#00d8f0] shrink-0 text-xl font-mono">
            {status === "SUCCESS" ? "✓" : "✕"}
          </div>

          <div className="flex-1 pr-2">
            <h4 className="font-bold tracking-wide text-sm text-white">{title}</h4>
            <p className="text-xs text-gray-300 mt-0.5">{message}</p>
          </div>

          <button 
            onClick={hideToast}
            className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* 3-Second Shrinking Progress Bar */}
        <div className="w-full bg-gray-800 h-1 relative overflow-hidden">
          {isOpen && (
            <div 
              className="absolute top-0 left-0 h-full bg-[#00d8f0] w-full origin-left animate-[shrink_3s_linear_forwards]" 
            />
          )}
        </div>
      </div>
    </div>
  );
}