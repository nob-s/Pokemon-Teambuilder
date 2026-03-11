import React from "react";
import type { Ability } from "../../types/Ability.ts";

interface PokemonAbilitiesProps {
  abilities: Ability[];
}

export const PokemonAbilities: React.FC<PokemonAbilitiesProps> = ({ abilities }) => {
  return (
    <div>
      <h3 className="font-semibold">Abilities</h3>
      <ul className="list-none">
        {abilities.map((ability) => (
          <li key={ability.name} className="mb-1">
            <span>{ability.name}</span>
            {ability.isHidden ? " (Hidden)" : ""}
            <p>{ability.shortEffect}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};