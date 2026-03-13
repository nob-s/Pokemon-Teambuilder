import React from "react";
import { PokemonParser } from "../../utils/PokemonParser.ts";

interface PokemonStatsProps {
  baseStats: Record<string, number>,
  stats: Record<string, number>,
  isShowingBase: boolean,
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({ baseStats, stats, isShowingBase }) => {

  return (
    <div>
      <p className="font-bold">Stats</p>
      <ul className="list-none p-0">
        {Object.entries(isShowingBase ? baseStats : stats).map((entry) => (
          <li key={entry[0]} className="mb-1 flex items-center gap-2">
            <span className="w-6 h-6 flex justify-center items-center text-lg">
              {PokemonParser.statNameToEmoji[entry[0]]}
            </span>
            <span className="font-medium">{PokemonParser.statNameShort[entry[0]]}:</span>
            <span>{entry[1]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};