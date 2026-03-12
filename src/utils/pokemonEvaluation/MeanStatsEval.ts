import { Pokemon } from "../../types/Pokemon.ts";
import { Format } from "../Format.ts";

export class MeanStatsEval {
  private static readonly EVAL_EXCELLENT = "Excellent";
  private static readonly EVAL_GREAT = "Great";
  private static readonly EVAL_GOOD = "Good";
  private static readonly EVAL_DECENT = "Decent";
  private static readonly EVAL_AVERAGE = "Average";
  private static readonly EVAL_POOR = "Poor";

  private static statBoundaries: Record<string, number> = {
    [MeanStatsEval.EVAL_EXCELLENT]: 130,
    [MeanStatsEval.EVAL_GREAT]: 110,
    [MeanStatsEval.EVAL_GOOD]: 90,
    [MeanStatsEval.EVAL_DECENT]: 80,
    [MeanStatsEval.EVAL_AVERAGE]: 60,
    [MeanStatsEval.EVAL_POOR]: 0,
  }

  private static readonly NO_GREAT_STAT_MSG =
    "Your team has no exceptionally high stat.";
  private static readonly NO_AVERAGE_STAT_MSG_MSG =
    "Your team has no exceptionally low stat.";
  private static readonly GREAT_STAT_MSG =
    (s: string[]) => `Your team has amazing ${Format.listToSentence(s)}!`;
  private static readonly AVERAGE_STAT_MSG =
    (s: string[]) => `Your team is extremely weak in ${Format.listToSentence(s)}!`;


  public static evalMeanStats(pokemonTeam: Pokemon[], statNames: string[]): string {
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
      .filter(([key, value]) =>
        value === this.EVAL_GOOD || value === this.EVAL_EXCELLENT)
      .map(([key]) => key);
    const averageStats = Object.entries(statEvals)
      .filter(([key, value]) =>
        value === this.EVAL_AVERAGE || value === this.EVAL_POOR)
      .map(([key]) => key);

    const greatEval = greatStats.length === 0
      ? this.NO_GREAT_STAT_MSG
      : this.GREAT_STAT_MSG(greatStats);
    const averageEval = averageStats.length === 0
      ? this.NO_AVERAGE_STAT_MSG_MSG
      : this.AVERAGE_STAT_MSG(averageStats);
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