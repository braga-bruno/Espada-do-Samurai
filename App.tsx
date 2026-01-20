
import React, { useState, useEffect } from 'react';
import { StatBox } from './components/StatBox.tsx';
import { DiceRoller } from './components/DiceRoller.tsx';
import { AdventureData, Monster } from './types.ts';

const INITIAL_DATA: AdventureData = {
  stats: {
    habilidade: 0,
    habilidadeInicial: 0,
    energia: 0,
    energiaInicial: 0,
    sorte: 0,
    sorteInicial: 0
  },
  pericia: '',
  honra: 0,
  provisoes: 10,
  notas: ''
};

const INITIAL_MONSTERS: Monster[] = Array.from({ length: 12 }, (_, i) => ({
  id: `monster-${i}`,
  nome: '',
  habilidade: 0,
  energia: 0
}));

const App: React.FC = () => {
  const [data, setData] = useState<AdventureData>(() => {
    try {
      const saved = localStorage.getItem('samurai_adventure_data');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch (e) {
      return INITIAL_DATA;
    }
  });

  const [monsters, setMonsters] = useState<Monster[]>(() => {
    try {
      const saved = localStorage.getItem('samurai_monsters');
      return saved ? JSON.parse(saved) : INITIAL_MONSTERS;
    } catch (e) {
      return INITIAL_MONSTERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('samurai_adventure_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('samurai_monsters', JSON.stringify(monsters));
  }, [monsters]);

  const updateStat = (key: keyof AdventureData['stats'], value: number) => {
    setData(prev => ({
      ...prev,
      stats: { ...prev.stats, [key]: value }
    }));
  };

  const updateMonster = (id: string, updates: Partial<Monster>) => {
    setMonsters(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const resetData = () => {
    if (confirm('Deseja resetar toda a ficha?')) {
      setData(INITIAL_DATA);
      setMonsters(INITIAL_MONSTERS);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 mb-24 relative z-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="brush-font text-5xl md:text-8xl font-bold text-red-800 drop-shadow-md tracking-widest uppercase">
          A Espada do Samurai
        </h1>
        <div className="mt-4 inline-block border-y-2 border-black py-1 px-12">
           <p className="text-xl font-bold uppercase tracking-[0.4em] text-black">Ficha de Aventura</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Main Character Sheet Section */}
        <section className="space-y-8">
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <StatBox 
              label="Habilidade" 
              currentValue={data.stats.habilidade}
              initialValue={data.stats.habilidadeInicial}
              onChangeCurrent={(val) => updateStat('habilidade', val)}
              onChangeInitial={(val) => updateStat('habilidadeInicial', val)}
              colorClass="text-blue-900"
            />
            <StatBox 
              label="Energia" 
              currentValue={data.stats.energia}
              initialValue={data.stats.energiaInicial}
              onChangeCurrent={(val) => updateStat('energia', val)}
              onChangeInitial={(val) => updateStat('energiaInicial', val)}
              colorClass="text-red-700"
            />
            <StatBox 
              label="Sorte" 
              currentValue={data.stats.sorte}
              initialValue={data.stats.sorteInicial}
              onChangeCurrent={(val) => updateStat('sorte', val)}
              onChangeInitial={(val) => updateStat('sorteInicial', val)}
              colorClass="text-green-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-black p-4 bg-white/70 shadow-sm">
              <label className="brush-font text-xl font-bold block mb-2 text-black">Perícia</label>
              <input 
                type="text" 
                value={data.pericia}
                onChange={(e) => setData(prev => ({ ...prev, pericia: e.target.value }))}
                placeholder="Ex: Iaijutsu..."
                className="w-full bg-transparent border-b-2 border-black/20 focus:border-black focus:outline-none py-2 text-xl text-black placeholder:text-black/20"
              />
            </div>
            <div className="border-4 border-black p-4 bg-white/70 shadow-sm flex flex-col items-center">
              <label className="brush-font text-xl font-bold mb-2 text-black">Honra</label>
              <div className="grid grid-cols-3 gap-2 w-full">
                 <button onClick={() => setData(prev => ({...prev, honra: prev.honra - 1}))} className="h-12 rounded border-2 border-black flex items-center justify-center hover:bg-black hover:text-white font-bold text-2xl text-black">-</button>
                 <input 
                  type="number" 
                  value={data.honra}
                  onChange={(e) => setData(prev => ({ ...prev, honra: parseInt(e.target.value) || 0 }))}
                  className="w-full text-center text-4xl font-black bg-transparent focus:outline-none text-amber-900"
                />
                 <button onClick={() => setData(prev => ({...prev, honra: prev.honra + 1}))} className="h-12 rounded border-2 border-black flex items-center justify-center hover:bg-black hover:text-white font-bold text-2xl text-black">+</button>
              </div>
            </div>
          </div>

          <div className="border-4 border-black p-5 bg-white/70 shadow-sm">
            <div className="flex justify-between items-center">
              <label className="brush-font text-xl font-bold text-black">Provisões</label>
              <div className="grid grid-cols-3 gap-4 items-center">
                <button onClick={() => setData(prev => ({...prev, provisoes: Math.max(0, prev.provisoes - 1)}))} className="w-12 h-12 rounded border-2 border-black hover:bg-black hover:text-white font-bold text-2xl text-black">-</button>
                <span className="text-4xl font-black text-center text-black min-w-[3rem]">{data.provisoes}</span>
                <button onClick={() => setData(prev => ({...prev, provisoes: prev.provisoes + 1}))} className="w-12 h-12 rounded border-2 border-black hover:bg-black hover:text-white font-bold text-2xl text-black">+</button>
              </div>
            </div>
          </div>

          <div className="border-4 border-black p-5 bg-white/70 shadow-sm h-64 flex flex-col">
            <label className="brush-font text-xl font-bold block mb-2 text-black">Notas e Inventário</label>
            <textarea 
              value={data.notas}
              onChange={(e) => setData(prev => ({ ...prev, notas: e.target.value }))}
              placeholder="Itens, pistas, códigos encontrados em sua jornada..."
              className="flex-1 w-full bg-transparent resize-none focus:outline-none p-3 border border-black/10 rounded text-lg text-black placeholder:text-black/20"
            />
          </div>

          <button 
            onClick={resetData}
            className="w-full py-4 border-2 border-dashed border-red-800 text-red-800 font-black hover:bg-red-800 hover:text-white transition-all rounded uppercase tracking-[0.3em] text-lg"
          >
            Resetar Aventura
          </button>
        </section>

        {/* Monster Encounter Section */}
        <section className="space-y-6">
          <div className="border-4 border-black p-4 text-center bg-black rounded-sm shadow-md">
            <h2 className="brush-font text-3xl font-bold uppercase tracking-widest text-white">Registro de Lutas</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {monsters.map((monster) => (
              <div key={monster.id} className="border-2 border-black p-4 bg-white/80 hover:bg-white transition-all shadow-sm group">
                <input 
                  type="text"
                  placeholder="Inimigo..."
                  value={monster.nome}
                  onChange={(e) => updateMonster(monster.id, { nome: e.target.value })}
                  className="w-full text-sm font-black uppercase border-b border-black/20 bg-transparent focus:outline-none mb-4 text-red-900 placeholder:text-black/20"
                />
                <div className="grid grid-cols-2 gap-4">
                  {/* Monster Habilidade */}
                  <div className="flex flex-col items-center border-2 border-black/10 rounded p-2 bg-white/50 group-hover:border-black/30 transition-colors">
                    <span className="text-[10px] uppercase font-black text-black mb-1">Habilidade</span>
                    <input 
                      type="number"
                      value={monster.habilidade}
                      onChange={(e) => updateMonster(monster.id, { habilidade: parseInt(e.target.value) || 0 })}
                      className="w-full text-center text-xl font-black bg-transparent focus:outline-none text-black mb-2"
                    />
                    <div className="grid grid-cols-2 gap-1 w-full">
                      <button 
                        onClick={() => updateMonster(monster.id, { habilidade: monster.habilidade - 1 })}
                        className="h-8 border border-black rounded hover:bg-black hover:text-white text-black font-bold"
                      >-</button>
                      <button 
                        onClick={() => updateMonster(monster.id, { habilidade: monster.habilidade + 1 })}
                        className="h-8 border border-black rounded hover:bg-black hover:text-white text-black font-bold"
                      >+</button>
                    </div>
                  </div>
                  {/* Monster Energia */}
                  <div className="flex flex-col items-center border-2 border-black/10 rounded p-2 bg-white/50 group-hover:border-black/30 transition-colors">
                    <span className="text-[10px] uppercase font-black text-black mb-1">Energia</span>
                    <input 
                      type="number"
                      value={monster.energia}
                      onChange={(e) => updateMonster(monster.id, { energia: parseInt(e.target.value) || 0 })}
                      className="w-full text-center text-xl font-black bg-transparent focus:outline-none text-black mb-2"
                    />
                    <div className="grid grid-cols-2 gap-1 w-full">
                      <button 
                        onClick={() => updateMonster(monster.id, { energia: monster.energia - 1 })}
                        className="h-8 border border-black rounded hover:bg-black hover:text-white text-black font-bold"
                      >-</button>
                      <button 
                        onClick={() => updateMonster(monster.id, { energia: monster.energia + 1 })}
                        className="h-8 border border-black rounded hover:bg-black hover:text-white text-black font-bold"
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Persistent Dice Component */}
      <DiceRoller />

      {/* Aesthetic decorations */}
      <div className="fixed bottom-0 left-0 p-8 opacity-5 pointer-events-none select-none">
        <div className="text-[20rem] font-black leading-none text-black">武</div>
      </div>
      <div className="fixed top-0 right-0 p-8 opacity-5 pointer-events-none select-none">
        <div className="text-[20rem] font-black leading-none text-black">侍</div>
      </div>
    </div>
  );
};

export default App;
