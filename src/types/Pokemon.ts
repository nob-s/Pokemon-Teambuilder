import type { Ability } from "./Ability.ts";

export class Pokemon {
    private static readonly ERROR_NAME = "Error fetching pokemon info... Try again!";
    private static readonly NO_POKE_NAME = "Search to add pokemon";
    public static readonly ERROR_POKEMON = Pokemon.emptyPokemonWithName(Pokemon.ERROR_NAME);
    public static readonly EMPTY_POKEMON = Pokemon.emptyPokemonWithName(Pokemon.NO_POKE_NAME);

    name: string;
    id: number;
    types: string[];
    abilities: Ability[];

    constructor(name: string, id: number, types: string[], abilities: Ability[]) {
        this.name = name;
        this.id = id;
        this.abilities = abilities;
        this.types = types;
    }

    private static emptyPokemonWithName(name: string): Pokemon {
        return this.constructor(name, 0, [], []);
    }
}
