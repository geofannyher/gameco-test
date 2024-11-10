import { PokemonDetail } from "@/app/pokemon/type";
import React from "react";

interface PokemonTableBodyProps {
  isLoading: boolean;
  isError: boolean;
  filteredPokemonList: PokemonDetail[] | undefined;
}

const PokemonTableBody: React.FC<PokemonTableBodyProps> = ({
  isLoading,
  isError,
  filteredPokemonList,
}) => {
  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={3} className="py-4 px-4 text-center">
            Loading...
          </td>
        </tr>
      </tbody>
    );
  }

  if (isError) {
    return (
      <tbody>
        <tr>
          <td colSpan={3} className="py-4 px-4 text-center text-red-500">
            Error loading Pokémon data.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {filteredPokemonList?.map((pokemon) => (
        <tr key={pokemon.id} className="hover:bg-gray-100">
          <td className="py-2 px-4 border-b border-gray-200">{pokemon.id}</td>
          <td className="py-2 px-4 border-b border-gray-200">{pokemon.name}</td>
          <td className="py-2 px-4 border-b border-gray-200">
            {pokemon.types.toString()}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default PokemonTableBody;
