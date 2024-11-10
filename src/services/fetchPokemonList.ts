import { PokemonAPIResponse, PokemonDetail } from "@/app/pokemon/type";
import axios from "axios";

const PAGE_SIZE = 15;

export async function fetchPokemonList(page: number) {
  const offset = page * PAGE_SIZE;
  const response = await axios.get<PokemonAPIResponse>(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${PAGE_SIZE}`
  );

  const pokemonDetails = await Promise.all(
    response.data.results.map(async (pokemon) => {
      const details = await axios.get<PokemonDetail>(pokemon.url);
      return {
        id: details.data.id,
        name: details.data.name,
        types: details.data.types.map((t) => t.type.name).join(", "),
      };
    })
  );

  return { pokemonDetails, totalCount: response.data.count };
}
