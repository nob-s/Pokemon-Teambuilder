import { Pokemon } from "../../types/Pokemon.ts";
import { PokeCache } from "../PokeCache.ts";
import { Format } from "../Format.ts";

export class TypeEval {

  static DEF_TYPE_VARIETY_CUTOFF = 3;

  private static NO_DEF_TYPE_VARIETY_MSG =
    `Your team has < ${TypeEval.DEF_TYPE_VARIETY_CUTOFF} Pokémon weak to one type!`;
  private static DEF_TYPE_VARIETY_MSG = "Your team has many Pokémon weak to these types: ";

  static evalTypes(pokemonTeam: Pokemon[]): string {
    pokemonTeam = pokemonTeam.filter(pokemon => pokemon !== Pokemon.EMPTY_POKEMON);
    const defVariety = this.getDefensiveVariety(this.getDefensiveStrength(pokemonTeam))
    return `${defVariety}\n`;
  }

  private static getDefensiveVariety(teamEff: Record<string, number>[]) {
    const totalWeaknesses = teamEff.reduce((acc, pokeEff) => {
      for (const key in pokeEff) {
        acc[key] = (acc[key] ?? 0) + (pokeEff[key] > 1 ? 1 : 0);
      }
      return acc;
    }, {});
    const weakTypes = Object.entries(totalWeaknesses)
      .filter(typeAndCount => typeAndCount[1] >= this.DEF_TYPE_VARIETY_CUTOFF);

    if (weakTypes.length === 0) {
      return this.NO_DEF_TYPE_VARIETY_MSG;
    }
    const weakString = Format.listToSentence(
      weakTypes
        .map(type => [Format.capitalizeFirst(type[0]), type[1]])
        .map(type => `${type[0]} (${type[1]} Pokémon)`));
    return this.DEF_TYPE_VARIETY_MSG + weakString;
  }

  private static getDefensiveStrength(pokemonTeam: Pokemon[]): Record<string, number>[] {
    return pokemonTeam.map(pokemon =>
      pokemon.types
        .map(type => this.getDefOfTypeVsAll(type))
        .reduce((acc, tList) => {
            for (const key in tList) {
              acc[key] = (acc[key] ?? 1) * tList[key];
            }
            return acc;
        }, {})
    );
  }

  /**
   * Returns a Record of effectiveness of @type defending against all other types
   */
  private static getDefOfTypeVsAll(type: string): Record<string, number> {
    const e = PokeCache.pokemonTypesCache;
    const myType = type.toLowerCase();
    const allEffs =
      Object.fromEntries(Object.keys(e).map(k => [k, 1]));
    for (const theirType of e[myType].double_damage_from) {
      allEffs[theirType.name] = 2;
    }
    for (const theirType of e[myType].half_damage_from) {
      allEffs[theirType.name] = 0.5;
    }
    for (const theirType of e[myType].no_damage_from) {
      allEffs[theirType.name] = 0;
    }
    return allEffs;
  }
}