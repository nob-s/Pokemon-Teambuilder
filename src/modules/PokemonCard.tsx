import React from "react";
import { Pokemon } from "../types/Pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onChangePokemon: (e: React.MouseEvent) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onChangePokemon}) => {
  return (
    <div className="border border-gray-400 rounded p-4 w-full h-full flex flex-col overflow-y-auto">
      <h2 className="font-bold text-lg text-center">{pokemon.name}</h2>
      {/* Display only if valid pokemon */}
      {pokemon === Pokemon.EMPTY_POKEMON ? (
        <div className="flex flex-1 justify-center items-center">
          <button
            className="bg-green-900 text-white font-bold py-2 px-4 rounded shadow hover:bg-green-700 transition"
            onClick={(e) => onChangePokemon(e)}
          >
            Add Displayed Pokemon
          </button>
        </div>
      ) : pokemon !== Pokemon.SEARCH_PROMPT_POKEMON ? (
        <>
          <p>ID: {pokemon.id}</p>
          <p>Type: {pokemon.types.join(', ')}</p>
          <img
            src={pokemon.spriteUrl}
            alt={`${pokemon.name} sprite`}
            className="w-64 h-64 object-contain my-2"
          />
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
        </>
      ) : null}
    </div>
  );
};