import React from "react";
import { Pokemon } from "../../types/Pokemon.ts";
import { PokemonAbilities } from "./PokemonAbilities.tsx";
import { PokemonStats } from "./PokemonStats.tsx";
import { PokemonPokeballDisplay } from "./PokemonPokeballDisplay.tsx";

interface PokemonDisplayProps {
  pokemon: Pokemon;
}

export const PokemonDisplay: React.FC<PokemonDisplayProps> = ({ pokemon }) => {
  return (
    <div className="border border-gray-400 rounded p-8 w-full h-full flex flex-col overflow-y-auto">
      <h2 className="font-bold text-center text-4xl">{pokemon.name}</h2>
      {/* Display only if valid pokemon */}
      {pokemon === Pokemon.SEARCH_PROMPT_POKEMON || pokemon === Pokemon.ERROR_POKEMON
        ? null
        : (
        <div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <p>ID: {pokemon.id}</p>
              <p>Type: {pokemon.types.join(', ')}</p>
              <PokemonStats
                baseStats={pokemon.baseStats}
                stats = { pokemon.stats }
                isShowingBase={ true }
              />
            </div>
            <PokemonPokeballDisplay spriteUrl={ pokemon.spriteUrl } />
          </div>
          <PokemonAbilities abilities={ pokemon.abilities }/>
        </div>
      )}
    </div>
  );
};