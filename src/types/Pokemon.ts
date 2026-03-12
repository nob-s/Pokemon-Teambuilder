import type { Ability } from "./Ability.ts";
import * as assert from "node:assert";

export class Pokemon {
    private static readonly ERROR_NAME = "Error fetching pokemon info... Try again!";
    private static readonly EMPTY_NAME = "[Empty slot]";
    private static readonly SEARCH_PROMPT_NAME = "Search to add pokemon";
    public static readonly ERROR_POKEMON = Pokemon.emptyPokemonWithName(Pokemon.ERROR_NAME);
    public static readonly EMPTY_POKEMON = Pokemon.emptyPokemonWithName(Pokemon.EMPTY_NAME);
    public static readonly SEARCH_PROMPT_POKEMON = Pokemon.emptyPokemonWithName(Pokemon.SEARCH_PROMPT_NAME);

    private readonly POKEMON_MAX_IV = 31;

    name: string;
    id: number;
    types: string[];
    baseStats: Record<string, number>;
    abilities: Ability[];
    spriteUrl: string;

    ivs: Record<string, number>;

    constructor(name: string, id: number, types: string[], baseStats: Record<string, number>, abilities: Ability[], spriteUrl: string) {
        this.name = name;
        this.id = id;
        this.types = types;
        this.baseStats = baseStats;
        this.abilities = abilities;
        this.spriteUrl = spriteUrl;
        // Modifiable data
        this.ivs = this.setMaxIvs(baseStats);

    }

    private setMaxIvs(baseStats: Record<string, number>): Record<string, number> {
        const maxIvs: Record<string, number> = {};
        for (const key in Object.entries(baseStats)) {
            maxIvs[key] = this.POKEMON_MAX_IV;
        }
        return maxIvs;
    }

    private calculateStat(statName: string, base: number, iv: number, level: number, ev: number): number {
        
        if (statName.toLowerCase() === "hp") {

        }
    }

    private static emptyPokemonWithName(name: string): Pokemon {
        return new Pokemon(name, -1, [], {}, [], "");
    }
}
