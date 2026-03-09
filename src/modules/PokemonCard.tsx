import React from "react";
import { Pokemon } from "../types/Pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="border border-gray-400 rounded p-2 w-64 h-80 overflow-y-auto">
      <h2 className="font-bold text-lg">{pokemon.name}</h2>
      <p>ID: {pokemon.id}</p>

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
  );
};