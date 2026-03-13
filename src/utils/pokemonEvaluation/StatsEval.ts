import { Pokemon } from "../../types/Pokemon.ts";
import { Format } from "../Format.ts";
import { PokemonParser } from "../PokemonParser.ts";

export class StatsEval {
  private static readonly EVAL_EXCELLENT = "Excellent";
  private static readonly EVAL_GREAT = "Great";
  private static readonly EVAL_GOOD = "Good";
  private static readonly EVAL_DECENT = "Decent";
  private static readonly EVAL_AVERAGE = "Average";
  private static readonly EVAL_POOR = "Poor";

  private static statBoundaries: Record<string, number> = {
    [StatsEval.EVAL_EXCELLENT]: 130,
    [StatsEval.EVAL_GREAT]: 110,
    [StatsEval.EVAL_GOOD]: 90,
    [StatsEval.EVAL_DECENT]: 80,
    [StatsEval.EVAL_AVERAGE]: 60,
    [StatsEval.EVAL_POOR]: 0,
  }

  private static readonly NO_GREAT_STAT_MSG =
    "Your team has no exceptionally high stat.";
  private static readonly GREAT_STAT_MSG =
    (s: string[]) => `Your team has amazing ${Format.listToSentence(s)}!`;
  private static readonly NO_AVERAGE_STAT_MSG_MSG =
    "Your team has no exceptionally low stat.";
  private static readonly AVERAGE_STAT_MSG =
    (s: string[]) => `Your team is weak in ${Format.listToSentence(s)}!`;
  private static readonly NO_EXTREME_STAT_MSG =
    "Your team has no Pokemon with extremely high or low stats!";
  private static readonly EXCELLENT_STAT_MSG =
    "Your pokemon have excellent stats: ";
  private static readonly POOR_STAT_MSG =
    "Your pokemon have poor stats: ";

  static evalExtremeStats(pokemonTeam: Pokemon[]): string {
    const excellentEval = this.evalExcellentStats(pokemonTeam);
    const poorEval = this.evalPoorStats(pokemonTeam);
    if (excellentEval === "" && poorEval === "") {
      return this.NO_EXTREME_STAT_MSG;
    }
    return `${excellentEval}\n${poorEval}`;
  }

  static evalMeanStats(pokemonTeam: Pokemon[], statNames: string[]): string {
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
      .filter(([, value]) =>
        value === this.EVAL_GOOD || value === this.EVAL_EXCELLENT)
      .map(([key]) => key);
    const averageStats = Object.entries(statEvals)
      .filter(([, value]) =>
        value === this.EVAL_AVERAGE || value === this.EVAL_POOR)
      .map(([key]) => key);

    const greatEval = greatStats.length === 0
      ? this.NO_GREAT_STAT_MSG
      : this.GREAT_STAT_MSG(greatStats);
    const averageEval = averageStats.length === 0
      ? this.NO_AVERAGE_STAT_MSG_MSG
      : this.AVERAGE_STAT_MSG(averageStats);
    return `${greatEval}\n ${averageEval}`;
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

  private static evalExcellentStats(pokemonTeam: Pokemon[]): string {
    const excellentPokemon = pokemonTeam
      .filter(pokemon => this.hasExcellentStats(pokemon));
    if (excellentPokemon.length === 0) {
      return "";
    }
    const excellentStr = excellentPokemon
      .map(pokemon =>
        `${pokemon.name} [${Format.listToSentence(this.getExcellentStats(pokemon).map(stat => PokemonParser.statNameShort[stat]))}]`);
    return this.EXCELLENT_STAT_MSG + excellentStr;
  }

  private static evalPoorStats(pokemonTeam: Pokemon[]): string {
    const poorPokemon = pokemonTeam
      .filter(pokemon => this.hasPoorStats(pokemon));
    if (poorPokemon.length === 0) {
      return "";
    }
    const poorStr = poorPokemon
      .map(pokemon =>
        `${pokemon.name} [${Format.listToSentence(this.getPoorStats(pokemon).map(stat => PokemonParser.statNameShort[stat]))}]`);
    return this.POOR_STAT_MSG + poorStr;
  }

  private static hasPoorStats(pokemon: Pokemon): boolean {
    return this.getPoorStats(pokemon).length > 0;
  }

  private static hasExcellentStats(pokemon: Pokemon): boolean {
    return this.getExcellentStats(pokemon).length > 0;
  }

  private static getExcellentStats(pokemon: Pokemon): string[] {
    return Object.entries(pokemon.baseStats)
      .filter(stat => stat[1] >= this.statBoundaries[this.EVAL_EXCELLENT])
      .map(([statName, ]) => statName);
  }

  private static getPoorStats(pokemon: Pokemon): string[] {
    return Object.entries(pokemon.baseStats)
      .filter(stat => stat[1] < this.statBoundaries[this.EVAL_AVERAGE])
      .map(([statName, ]) => statName);
  }
}