import { Pokemon } from "../../types/Pokemon.ts";
import { StatsEval } from "./StatsEval.ts";
import { TypeEval } from "./TypeEval.ts";

export class PokeEval {
  private static readonly EMPTY_TEAM_MSG =
    "You don't have a team yet! Add a Pokemon to start team evaluation!"

  static evalStats(pokemonTeam: Pokemon[]): string {
    if (this.getTeamSize(pokemonTeam) === 0) {
      return this.EMPTY_TEAM_MSG
    }
    const statNames = Object.keys(pokemonTeam[0].baseStats);
    const evalMeanStats = StatsEval.evalMeanStats(pokemonTeam, statNames);
    const evalExtremeStats = StatsEval.evalExtremeStats(pokemonTeam)
    const evalTypes = TypeEval.evalTypes(pokemonTeam);
    return `${evalMeanStats}\n${evalTypes}\n${evalExtremeStats}\n`;
  }

  private static getTeamSize(pokemonTeam: Pokemon[]) {
    let count = 0;
    for (const pokemon of pokemonTeam) {
      if (pokemon !== Pokemon.EMPTY_POKEMON) {
        count++;
      }
    }
    return count;
  }
}