import React from "react";
import { Pokemon } from "../../types/Pokemon.ts";
import { PokemonAbilities } from "./PokemonAbilities.tsx";
import { PokemonStats } from "./PokemonStats.tsx";

interface PokemonCardProps {
  pokemon: Pokemon;
  onChangePokemon: (e: React.MouseEvent) => void;
  onDeletePokemon: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onChangePokemon, onDeletePokemon }) => {
  return (
    <div className="border border-gray-400 rounded p-4 w-full h-full flex flex-col overflow-y-auto">
      <div className="flex">
        <h2 className="font-bold text-center text-3xl">
          {pokemon.name}
        </h2>
        <button
          className="ml-auto bg-red-700 text-white font-bold px-2 rounded shadow hover:bg-red-800 transition"
          onClick={() => onDeletePokemon()}
        >
          Del
        </button>
      </div>

      {pokemon === Pokemon.EMPTY_POKEMON ? (
        <div className="flex flex-1 justify-center items-center">
          <button
            className="bg-green-900 text-white font-bold py-2 px-4 rounded shadow hover:bg-green-700 transition"
            onClick={(e) => onChangePokemon(e)}
          >
            Add Displayed Pokemon
          </button>
        </div>
      ) : pokemon === Pokemon.ERROR_POKEMON
        ? null
        : (
        <div className="text-s p-4">
          <div className="flex flex-col">
            <p>Type: {pokemon.types.join(', ')}</p>
          </div>
          <img
            src={pokemon.spriteUrl}
            alt={`${pokemon.name} sprite`}
            className="relative flex object-contain z-10"
          />
          <PokemonStats
            baseStats={pokemon.baseStats}
            stats = { pokemon.stats }
            isShowingBase={ true }
          />
          <PokemonAbilities abilities={ pokemon.abilities }/>
        </div>
      )}
    </div>
  );
};