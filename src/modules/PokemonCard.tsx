import React from "react";
import { Pokemon } from "../types/Pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onChangePokemon: (e: React.MouseEvent) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onChangePokemon }) => {
  return (
    <div className="border border-gray-400 rounded p-4 w-full h-full flex flex-col overflow-y-auto">
      <h2 className="font-bold text-center text-2xl">{pokemon.name}</h2>
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
        <div className="text-xs p-4">
          <div className="flex flex-col">
            <p>ID: {pokemon.id}</p>
            <p>Type: {pokemon.types.join(', ')}</p>
          </div>
          <img
            src={pokemon.spriteUrl}
            alt={`${pokemon.name} sprite`}
            className="relative flex object-contain z-10"
          />
          <div>
            <p className="font-bold">Base Stats</p>
            <ul className="list-none">
              {Object.entries(pokemon.stats).map((entry) => (
                <li key={entry[0]} className="mb-1">
                  <span className="font-medium">{entry[0]}: </span>
                  {entry[1]}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mt-2">Abilities</h3>
            <ul className="list-none">
              {pokemon.abilities.map((ability) => (
                <li key={ability.name} className="mb-1">
                  <span>{ability.name}</span>
                  {ability.isHidden ? " (Hidden)" : ""}
                  <p>{ability.shortEffect}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};