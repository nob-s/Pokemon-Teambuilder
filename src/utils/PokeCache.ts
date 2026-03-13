import { Api } from "./Api.ts";

type PokemonApiResult = {
  name: string,
};

type TypeApiResult = {
  url: string,
};

type TypeApiProcessed = {
  name: string,
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
}

export class PokeCache {
  /**
   * To be used for search bar dropdown
   */
  public static pokemonNameCache: string[] = [];

  public static pokemonTypesCache: Record<string, TypeApiProcessed["damage_relations"]> = {};

  private static POKEMON_ENDPOINT_URL = "https://pokeapi.co/api/v2/pokemon?limit=10000";
  private static TYPES_ENDPOINT_URL = "https://pokeapi.co/api/v2/type?limit=1000";

  // @ts-ignore
  private static initializer =
    Promise.all([PokeCache.initPokemonTypesCache(), PokeCache.initPokemonNameCache()]);

  static async ready() {
    await PokeCache.initializer;
  }

  private static async initPokemonNameCache() {
    const arrName = "pokemonNameCache";

    console.log(arrName, " is loading");
    const data = await Api.fetchAndJsonOrNull(PokeCache.POKEMON_ENDPOINT_URL);
    const results: PokemonApiResult[] = data.results ?? [];
    console.log(arrName, " raw results:", results);

    PokeCache.pokemonNameCache = results.map(pokemon => pokemon.name)
    console.log(arrName, " loaded:", PokeCache.pokemonNameCache);
  }

  private static async initPokemonTypesCache() {
    const arrName = "pokemonTypesCache";

    console.log(arrName, " is loading");
    const data = await Api.fetchAndJsonOrNull(PokeCache.TYPES_ENDPOINT_URL);
    const results: TypeApiResult[] = data.results ?? [];
    console.log(arrName, " raw results:", results);

    const inter = await Promise.all(
      results.map(type => Api.fetchAndJsonOrNull(type.url)));
    PokeCache.pokemonTypesCache = Object.fromEntries(
      inter.map(t => [t.name, t.damage_relations]));
    console.log(arrName, " loaded:", PokeCache.pokemonTypesCache);
  }
}