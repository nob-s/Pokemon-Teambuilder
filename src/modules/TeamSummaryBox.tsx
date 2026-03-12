import React from "react";
import type { Pokemon } from "../types/Pokemon.ts";
import { PokeEval } from "../utils/PokeEval.ts";

interface TeamSummaryBoxProps {
  pokemonTeam: Pokemon[],
}

export const TeamSummaryBox: React.FC<TeamSummaryBoxProps> = ({ pokemonTeam }) => {
  return (
    <div className="border border-gray-400 rounded p-8">
      <p className="whitespace-pre-line">{PokeEval.evalStats(pokemonTeam)}</p>
    </div>
  );
}