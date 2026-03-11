import React from "react";

interface PokemonStatsProps {
  stats: Record<string, number>;
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
  return (
    <div>
      <p className="font-bold">Base Stats</p>
      <ul className="list-none p-0">
        {Object.entries(stats).map((entry) => (
          <li key={entry[0]} className="mb-1">
            <span>{entry[0]}: </span>
            {entry[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};