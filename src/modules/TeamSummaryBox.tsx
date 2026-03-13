import React from "react";
import type { Pokemon } from "../types/Pokemon.ts";
import { PokeEval } from "../utils/pokemonEvaluation/PokeEval.ts";

interface TeamSummaryBoxProps {
  pokemonTeam: Pokemon[],
}

export const TeamSummaryBox: React.FC<TeamSummaryBoxProps> = ({ pokemonTeam }) => {
  return (
    <div className="w-full h-full overflow-y-auto border border-purple-700 rounded p-8">
      <p className="whitespace-pre-line">{PokeEval.evalStats(pokemonTeam)}</p>
    </div>
  );
}