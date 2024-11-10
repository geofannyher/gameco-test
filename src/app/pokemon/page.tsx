"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "@/services/fetchPokemonList";
import PokemonTableBody from "@/components/table/PokemonTableBody";
import Pagination from "@/components/pagination/Pagination";
import { PokemonDetail } from "./type";

function PokemonTable() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemonList", page],
    queryFn: () => fetchPokemonList(page),
  });

  const filteredPokemonList = data?.pokemonDetails.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Pokémon List</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Pokémon by Name"
          className="w-full p-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left font-semibold">
                ID
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left font-semibold">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <PokemonTableBody
            isLoading={isLoading}
            isError={isError}
            filteredPokemonList={
              filteredPokemonList as PokemonDetail[] | undefined
            }
          />
        </table>
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        totalCount={data?.totalCount || 0}
      />
    </div>
  );
}

export default PokemonTable;
