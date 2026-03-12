import { Pokemon } from "../types/Pokemon";
import { Format } from "./Format.ts";

type damageRelationsApiResponse = {
  damage_relations: {
    double_damage_from: {
      name: string,
    }[],
    double_damage_to: {
      name: string,
    }[],
    half_damage_from: {
      name: string,
    }[],
    half_damage_to: {
      name: string,
    }[],
    no_damage_from: {
      name: string,
    }[],
    no_damage_to: {
      name: string,
    }[],
  },
};

export class PokeEval {
  private static readonly EMPTY_TEAM_MSG =
    "You don't have a team yet! Add a Pokemon to start team evaluation!"

  private static readonly NO_EXCELLENT_STAT_MSG = "Your team has no exceptionally high stat.";
  private static readonly NO_POOR_STAT_MSG_MSG = "Your team has no exceptionally low stat.";

  private static statBoundaries = {
    "Excellent": 130,
    "Great": 110,
    "Good": 90,
    "Decent": 80,
    "Average": 60,
    "Poor": 0,
  }

  static evalStats(pokemonTeam: Pokemon[]): string {
    if (this.getTeamSize(pokemonTeam) === 0) {
      return this.EMPTY_TEAM_MSG
    }
    const statNames = Object.keys(pokemonTeam[0].baseStats);
    const totalStats = this.evalMeanStats(pokemonTeam, statNames);
    return `${totalStats} \n`;
  }

  private static evalMeanStats(pokemonTeam: Pokemon[], statNames: string[]): string {
    const totalStats: Record<string, number> = {}
    for (const statName of statNames) {
      totalStats[statName] = this.getTotalStats(statName, pokemonTeam);
    }

    // Map stat average across team to evaluation, based on this.statBoundaries
    const statEvals: Record<string, string> = {};
    for (const [statName, totalStat] of Object.entries(totalStats)) {
      for (const [evaluation, bound] of Object.entries(this.statBoundaries)) {
        if (totalStat/this.getTeamSize(pokemonTeam) >= bound) {
          statEvals[statName] = evaluation;
          break;
        }
      }
    }

    const greatStats = Object.entries(statEvals)
      .filter(([key, value]) => value === "Great" || value === "Excellent")
      .map(([key]) => key);
    const averageStats = Object.entries(statEvals)
      .filter(([key, value]) => value === "Average" || value === "Poor")
      .map(([key]) => key);

    const greatEval = greatStats.length === 0
      ? this.NO_EXCELLENT_STAT_MSG
      :`Your team has amazing ${Format.listToSentence(greatStats)}!`;
    const averageEval = averageStats.length === 0
      ? this.NO_POOR_STAT_MSG_MSG
      : `Your team is extremely weak in ${Format.listToSentence(averageStats)}!`;
    return `${greatEval}\n ${averageEval}\n`;
  }

  private static getTotalStats(statName: string, pokemonTeam: Pokemon[]): number {
      let totalStats = 0;
      for (const pokemon of pokemonTeam) {
        if (pokemon == Pokemon.EMPTY_POKEMON) {
          continue;
        }
        totalStats += pokemon.baseStats[statName]
      }
      return totalStats;
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