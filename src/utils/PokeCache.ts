import { Api } from "./Api.ts";

type PokemonApiResponse = {
  name: string,
}

export class PokeCache {
  public static pokemonNameCache: string[] = [];

  private static POKEMON_ENDPOINT_URL = (limit: number) =>
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

  private static initializer = (async () => {
    console.log("Cache is loading");
    const data = await Api.fetchAndJsonOrNull(PokeCache.POKEMON_ENDPOINT_URL(10000));
    const results: PokemonApiResponse[] = PokeCache.pokemonNameCache = data.results || [];
    console.log("Raw results:", results);
    PokeCache.pokemonNameCache = results.map(pokemon => pokemon.name)
    console.log("Cache loaded:", PokeCache.pokemonNameCache);
  })();
}