export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonAPIResponse {
  count: number;
  results: PokemonResult[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  types: PokemonType[];
}
export interface PokemonDetailData {
  id: number;
  name: string;
  types: string;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonTableState {
  pokemonList: PokemonDetail[];
  searchQuery: string;
  page: number;
  totalCount: number;
}
