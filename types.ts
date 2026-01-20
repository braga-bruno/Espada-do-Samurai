
export interface CharacterStats {
  habilidade: number;
  habilidadeInicial: number;
  energia: number;
  energiaInicial: number;
  sorte: number;
  sorteInicial: number;
}

export interface AdventureData {
  stats: CharacterStats;
  pericia: string;
  honra: number;
  provisoes: number;
  notas: string;
}

export interface Monster {
  id: string;
  nome: string;
  habilidade: number;
  energia: number;
}
