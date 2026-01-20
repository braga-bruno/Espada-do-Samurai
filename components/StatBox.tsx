
import React from 'react';

interface StatBoxProps {
  label: string;
  currentValue: number;
  initialValue: number;
  onChangeCurrent: (val: number) => void;
  onChangeInitial: (val: number) => void;
  colorClass: string;
}

export const StatBox: React.FC<StatBoxProps> = ({ 
  label, 
  currentValue, 
  initialValue, 
  onChangeCurrent, 
  onChangeInitial,
  colorClass
}) => {
  return (
    <div className="flex flex-col border-4 border-black bg-white/70 p-2 shadow-md relative h-full">
      {/* Seção Inicial - Topo */}
      <div className="flex justify-between items-center border-b border-black/10 pb-1 mb-2">
        <span className="text-[10px] font-black uppercase tracking-tighter text-black">Inicial</span>
        <input 
          type="number" 
          value={initialValue} 
          onChange={(e) => onChangeInitial(parseInt(e.target.value) || 0)}
          className="w-8 text-center font-bold bg-transparent focus:outline-none text-black text-sm"
        />
      </div>

      {/* Nome do Atributo */}
      <div className="text-center mb-1">
        <span className="brush-font text-base md:text-xl font-bold text-black leading-tight block">
          {label}
        </span>
      </div>

      {/* Valor Atual */}
      <div className="flex flex-col items-center justify-center flex-1">
        <input 
          type="number" 
          value={currentValue} 
          onChange={(e) => onChangeCurrent(parseInt(e.target.value) || 0)}
          className={`w-full text-center text-4xl md:text-5xl font-black bg-transparent focus:outline-none py-2 ${colorClass}`}
        />
        
        {/* Controles - Grid que ocupa a largura total interna */}
        <div className="grid grid-cols-2 gap-2 w-full px-1 pb-1 mt-auto">
          <button 
            onClick={() => onChangeCurrent(currentValue - 1)}
            className="h-10 md:h-12 rounded border-2 border-black flex items-center justify-center hover:bg-black hover:text-white active:bg-black active:text-white transition-all text-black font-bold text-2xl bg-white/50"
            aria-label="Diminuir"
          >
            -
          </button>
          <button 
            onClick={() => onChangeCurrent(currentValue + 1)}
            className="h-10 md:h-12 rounded border-2 border-black flex items-center justify-center hover:bg-black hover:text-white active:bg-black active:text-white transition-all text-black font-bold text-2xl bg-white/50"
            aria-label="Aumentar"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
