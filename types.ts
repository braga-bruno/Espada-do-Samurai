
export interface CharacterStats {
  habilidade: number;
  habilidadeInicial: number;
  energia: number;
  energiaInicial: number;
  sorte: number;
  sorteInicial: number;
}

export interface Flechas {
  salgueiro: number;
  rasgadoras: number;
  perfurantes: number;
  zunidoras: number;
}

export interface AdventureData {
  stats: CharacterStats;
  pericia: string;
  honra: number;
  provisoes: number;
  notas: string;
  flechas: Flechas;
}

export interface Monster {
  id: string;
  nome: string;
  habilidade: number;
  energia: number;
}
