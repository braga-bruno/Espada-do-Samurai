
import React, { useState } from 'react';

export const DiceRoller: React.FC = () => {
  const [result, setResult] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = (count: number) => {
    setIsRolling(true);
    setResult([]);
    
    // Aesthetic delay for the "roll"
    setTimeout(() => {
      const newRolls = Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
      setResult(newRolls);
      setIsRolling(false);
    }, 400);
  };

  const clearResult = () => {
    setResult([]);
  };

  const DiceIcon: React.FC<{ value: number }> = ({ value }) => {
    const dots = [
      [], // 0
      [4], // 1
      [0, 8], // 2
      [0, 4, 8], // 3
      [0, 2, 6, 8], // 4
      [0, 2, 4, 6, 8], // 5
      [0, 2, 3, 5, 6, 8] // 6
    ];

    return (
      <div className="w-12 h-12 bg-white border-2 border-black rounded-lg relative shadow-md">
        <div className="grid grid-cols-3 grid-rows-3 p-1 w-full h-full">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              {dots[value].includes(i) && (
                <div className="w-2 h-2 bg-black rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {result.length > 0 && !isRolling && (
        <div className="bg-white p-3 rounded-xl border-4 border-black shadow-2xl flex flex-col items-center animate-bounce relative min-w-[120px]">
          <button 
            onClick={clearResult}
            className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-800 transition-colors border border-white"
          >
            ✕
          </button>
          <div className="flex gap-2 mb-1">
            {result.map((val, idx) => <DiceIcon key={idx} value={val} />)}
          </div>
          <span className="font-black text-2xl text-black">Total: {result.reduce((a, b) => a + b, 0)}</span>
        </div>
      )}

      <div className="flex gap-2">
        <button 
          onClick={() => rollDice(1)}
          disabled={isRolling}
          className="bg-red-700 text-white px-4 py-2 rounded-full border-2 border-black font-bold shadow-lg hover:bg-red-800 transition-all flex items-center gap-2"
        >
          🎲 1d6
        </button>
        <button 
          onClick={() => rollDice(2)}
          disabled={isRolling}
          className="bg-red-700 text-white px-4 py-2 rounded-full border-2 border-black font-bold shadow-lg hover:bg-red-800 transition-all flex items-center gap-2"
        >
          🎲 2d6
        </button>
      </div>
    </div>
  );
};
