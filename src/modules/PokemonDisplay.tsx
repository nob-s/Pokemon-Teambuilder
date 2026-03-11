import React from "react";
import { Pokemon } from "../types/Pokemon";

interface PokemonDisplayProps {
  pokemon: Pokemon;
}

export const PokemonDisplay: React.FC<PokemonDisplayProps> = ({ pokemon }) => {
  return (
    <div className="border border-gray-400 rounded p-4 w-full h-full flex flex-col overflow-y-auto">
      <h2 className="font-bold text-center text-2xl">{pokemon.name}</h2>
      {/* Display only if valid pokemon */}
      {pokemon === Pokemon.SEARCH_PROMPT_POKEMON || pokemon === Pokemon.ERROR_POKEMON
        ? null
        : (
        <div>
          <div className="flex p-4 justify-between">
            <div className="flex flex-col gap-3">
              <p>ID: {pokemon.id}</p>
              <p>Type: {pokemon.types.join(', ')}</p>
              <div>
                <p className="font-bold">Base Stats</p>
                <ul className="list-none p-0">
                  {Object.entries(pokemon.stats).map((entry) => (
                    <li key={entry[0]} className="mb-1">
                      <span className="font-medium">{entry[0]}: </span>
                      {entry[1]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative w-64 h-64 rounded-full border-4 border-black overflow-hidden shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
              <img
                src={pokemon.spriteUrl}
                alt={`${pokemon.name} sprite`}
                className="relative w-full h-full object-contain z-10"
              />
              <div className="absolute top-1/2 left-0 w-full h-3 bg-black"></div>
            </div>
          </div>
          <div className = "p-4">
            <h3 className="font-semibold mt-2">Abilities</h3>
            <ul className="list-none p-0">
              {pokemon.abilities.map((ability) => (
                <li key={ability.name} className="mb-1">
                  <span className="font-medium">{ability.name}</span>
                  {ability.isHidden ? " (Hidden)" : ""}
                  <p className="text-sm">{ability.shortEffect}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};