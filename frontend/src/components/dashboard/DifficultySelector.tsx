import React, { useState } from 'react';
import { ArrowRight, X, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

interface DifficultyConfig {
  id: DifficultyLevel;
  levelNumber: string;
  name: string;
  rangeText: string;
  attemptsText: string;
  cardDescription: string;
  panelDescription: string;
  rangeBadge: string;
}

const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  EASY: {
    id: 'EASY',
    levelNumber: '01',
    name: 'EASY',
    rangeText: '0 - 100',
    attemptsText: '5 attempts',
    cardDescription: 'Small range. Quick rhythm. Trust your first win.',
    panelDescription: 'Quick warm-up. Perfect your rhythm.',
    rangeBadge: '0-100 Inclusive - 5 attempts',
  },
  MEDIUM: {
    id: 'MEDIUM',
    levelNumber: '02',
    name: 'MEDIUM',
    rangeText: '0 - 1,000',
    attemptsText: '8 attempts',
    cardDescription: 'Wider range. Sharper focus. Test your intuition.',
    panelDescription: 'More range. Sharper instincts.',
    rangeBadge: '0-1,000 Inclusive - 8 attempts',
  },
  HARD: {
    id: 'HARD',
    levelNumber: '03',
    name: 'HARD',
    rangeText: '0 - 10,000',
    attemptsText: '15 attempts',
    cardDescription: '10,000 choices. Pure logic. Every guess counts.',
    panelDescription: '10k range. Ultimate test of logic.',
    rangeBadge: '0-10,000 Inclusive - 15 attempts',
  },
};

interface DifficultySelectorProps {
  playerName?: string;
  onConfirmStart?: (selectedDifficulty: DifficultyConfig) => void;
  onChangePlayer?: () => void;
}

// FIXME: Have the user profiles to be dynamic
// FIXME: Remove the wordiness that sorround the file.
// FIXME: Have the display to be responsive.
// FIXME: Refactor the code to reduce the number of lines

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  playerName = 'PixelPilot',
  onConfirmStart,
  onChangePlayer,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('EASY');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const activeConfig = DIFFICULTY_CONFIGS[selectedDifficulty];
  const navigate = useNavigate()

  const handleStart = () => {
    setIsModalOpen(true);
  };

  const handleConfirmModal = () => {
    navigate("/game")
    setIsModalOpen(false);
    if (onConfirmStart) {
      onConfirmStart(activeConfig);
    }
  };

  return (
<>
      <div className="w-[7xl] min-h-screen bg-white text-black font-sans px-12 py-10 flex flex-col justify-between selection:bg-light-blue selection:text-black">
        {/* Top Main Section */}
        <div>
          {/* Header Breadcrumb & Title */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 uppercase mb-3">
              <span className="w-2 h-2 bg-light-blue inline-block"></span>
              <span>NEW GAME</span>
              <span>/</span>
              <span>CHOOSE YOUR CHALLENGE</span>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-5xl font-black tracking-tight text-black uppercase font-mono mb-2">
                  BIG RANGE. BIGGER INSTINCTS.
                </h1>
                <p className="text-slate-500 font-medium text-lg">
                  One hidden number. A handful of chances. How far will you go?
                </p>
              </div>

              {/* Top Right Player Badge */}
              <div className="flex items-center gap-3 border border-slate-200 p-2 pr-4 bg-slate-50">
                <div className="w-10 h-10 bg-color-black text-light-blue font-mono font-bold flex items-center justify-center text-sm">
                  PX
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    PLAYER READY
                  </span>
                  <span className="text-sm font-bold text-black">{playerName}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Difficulty Cards Section */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {(Object.keys(DIFFICULTY_CONFIGS) as DifficultyLevel[]).map((key) => {
              const config = DIFFICULTY_CONFIGS[key];
              const isSelected = selectedDifficulty === key;

              return (
                <div key={key} className="flex flex-col">
                  {/* Card Header Bar */}
                  <div className="flex justify-between items-center mb-2 px-1 text-xs font-mono font-bold text-slate-400">
                    <span>LEVEL / {config.levelNumber}</span>
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-black font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-black inline-block"></span>
                        SELECTED
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedDifficulty(key)}
                        className="text-slate-400 hover:text-black transition-colors uppercase tracking-wider"
                      >
                        SELECT MODE
                      </button>
                    )}
                  </div>

                  {/* Card Body */}
                  <div
                    onClick={() => setSelectedDifficulty(key)}
                    className={`cursor-pointer transition-all duration-200 border-2 rounded-none p-8 h-70 flex flex-col justify-between items-center text-center ${
                      isSelected
                        ? 'bg-light-blue border-light-blue text-black shadow-lg scale-[1.01]'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <div className="w-full">
                      <h2 className="text-4xl font-black tracking-tight font-mono uppercase mb-1">
                        {config.name}
                      </h2>
                      <p className="text-lg font-mono tracking-wide font-medium">
                        {config.rangeText}
                      </p>
                    </div>

                    <div className="my-auto">
                      <span className="text-sm font-semibold tracking-wide border-t border-b border-black/10 py-1 px-4 inline-block">
                        {config.attemptsText}
                      </span>
                    </div>
                  </div>

                  {/* Micro-copy below card */}
                  <p className="mt-3 text-xs text-slate-500 font-medium px-1">
                    {config.cardDescription}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Selected Banner / CTA Container */}
          <div className="bg-card-bg text-white p-8 flex items-center justify-between shadow-md">
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-1">
                YOUR NEXT CHALLENGE
              </span>
              <h3 className="text-2xl font-black font-mono tracking-wide uppercase">
                {activeConfig.name} MODE
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                {activeConfig.rangeBadge}
              </p>
            </div>

            <div className="flex-1 max-w-md mx-8 border-l border-slate-700 pl-8">
              <h4 className="text-sm font-bold text-white mb-1">
                Read the hint. Refine your guess.
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                After each guess, we'll tell you to go higher or lower. {activeConfig.panelDescription}
              </p>
            </div>

            <div>
              <button
                onClick={handleStart}
                className="bg-light-blue hover:bg-[#1ebbc5] text-black font-mono font-bold py-4 px-10 flex items-center gap-3 transition-colors uppercase text-sm tracking-wider cursor-pointer"
              >
                <span>START</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Meta Section */}
        <footer className="mt-12 pt-4 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>Playing as <strong className="text-slate-700">{playerName}</strong></span>
            <span>/</span>
            <button
              onClick={onChangePlayer}
              className="hover:text-black underline transition-colors cursor-pointer"
            >
              Change player
            </button>
          </div>

          <div className="flex items-center gap-6">
            <span className="tracking-widest">THINK IT THROUGH. EVERY GUESS COUNTS.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span>HIGH / LOWER — A LITTLE LOGIC. A LITTLE LUCK.</span>
            <span>SKELETON CONCEPT - SAMPLE DATA</span>
            <span>#1 / DIFFICULTY</span>
          </div>
        </footer>
      </div>

      {/* START GAME CONFIGURATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-black w-full max-w-lg p-8 shadow-2xl flex flex-col relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-light-blue inline-block"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
                  READY TO LAUNCH
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Game Summary */}
            <div className="mb-8">
              <h2 className="text-3xl font-black font-mono uppercase mb-2">
                {activeConfig.name} MODE SELECTED
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Review your parameters before entering the grid.
              </p>

              <div className="grid grid-cols-2 gap-4 border border-slate-200 bg-slate-50 p-4 font-mono">
                <div className="border-r border-slate-200 pr-4">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider mb-1">
                    Number Range
                  </span>
                  <span className="text-xl font-bold text-black">
                    {activeConfig.rangeText}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider mb-1">
                    Allowed Attempts
                  </span>
                  <span className="text-xl font-bold text-black">
                    {activeConfig.attemptsText}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-card-bg text-white text-xs font-mono flex items-center justify-between">
                <span className="text-slate-400">INSTINCT LEVEL:</span>
                <span className="text-light-blue font-bold">{activeConfig.cardDescription}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-slate-300 text-xs font-mono font-bold uppercase text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmModal}
                className="bg-light-blue hover:bg-[#1ebbc5] text-black font-mono font-bold px-8 py-3 text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Launch Game</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};