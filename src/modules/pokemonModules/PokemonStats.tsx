import React from "react";

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
          <li key={entry[0]} className="mb-1">
            <span>{entry[0]}: </span>
            {entry[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};