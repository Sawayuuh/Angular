export interface IPokemonListItem {
  name: string;
  url: string;
}

export interface IPokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonListItem[];
}

export interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IPokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: IPokemonType[];
  stats: IPokemonStat[];
  abilities: IPokemonAbility[];
}
