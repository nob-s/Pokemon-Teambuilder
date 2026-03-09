import type { Ability } from "./Ability.ts";

export class Pokemon {
    private static readonly ERROR_NAME = "Error fetching pokemon info... Try again!";
    private static readonly EMPTY_NAME = "[Empty slot]";
    private static readonly SEARCH_PROMPT_NAME = "Search to add pokemon";
    public static readonly ERROR_POKEMON = Pokemon.emptyPokemonWithName(Pokemon.ERROR_NAME);
    public static readonly EMPTY_POKEMON = Pokemon.emptyPokemonWithName(Pokemon.EMPTY_NAME);
    public static readonly SEARCH_PROMPT_POKEMON = Pokemon.emptyPokemonWithName(Pokemon.SEARCH_PROMPT_NAME);

    name: string;
    id: number;
    types: string[];
    abilities: Ability[];
    spriteUrl: string;

    constructor(name: string, id: number, types: string[], abilities: Ability[], spriteUrl: string) {
        this.name = name;
        this.id = id;
        this.abilities = abilities;
        this.types = types;
        this.spriteUrl = spriteUrl;
    }

    private static emptyPokemonWithName(name: string): Pokemon {
        return new Pokemon(name, -1, [], [], "");
    }
}
