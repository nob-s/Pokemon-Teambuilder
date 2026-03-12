import { Pokemon } from "../../types/Pokemon.ts";

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

export class TypeEval {
  public static evalTypes(pokemonTeam: Pokemon[]): string {

  }

  private static getAttackStrength(pokemonTeam: Pokemon[]): number {

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