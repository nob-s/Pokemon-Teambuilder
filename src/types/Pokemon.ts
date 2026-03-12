import type { Ability } from "./Ability.ts";

/**
 * Stats are assumed to be max IVs and 0 EVs, implementation might take too long.
 */

export class Pokemon {
    private static readonly ERROR_NAME = "Error fetching pokemon info... Try again!";
    private static readonly EMPTY_NAME = "[Empty slot]";
    private static readonly SEARCH_PROMPT_NAME = "Search to add pokemon";
    public static readonly ERROR_POKEMON = Pokemon.emptyPokemonWithName(Pokemon.ERROR_NAME);
    public static readonly EMPTY_POKEMON = Pokemon.emptyPokemonWithName(Pokemon.EMPTY_NAME);
    public static readonly SEARCH_PROMPT_POKEMON = Pokemon.emptyPokemonWithName(Pokemon.SEARCH_PROMPT_NAME);

    private readonly POKEMON_MAX_IV = 31;
    private readonly POKEMON_MIN_IV = 0;
    private readonly POKEMON_MAX_TOTAL_EV = 255;

    private readonly POKEMON_MAX_LEVEL = 100;
    private readonly POKEMON_MIN_LEVEL = 1;
    private readonly POKEMON_DEFAULT_NATURE_MULT = 1;

    name: string;
    id: number;
    types: string[];
    baseStats: Record<string, number>;
    abilities: Ability[];
    spriteUrl: string;
    // Modifiable data
    ivs: Record<string, number>;
    evs: Record<string, number>;
    level: number;
    stats: Record<string, number>;

    private static emptyPokemonWithName(name: string): Pokemon {
        return new Pokemon(name, -1, [], {}, [], "");
    }

    constructor(name: string, id: number, types: string[], baseStats: Record<string, number>, abilities: Ability[], spriteUrl: string) {
        this.name = name;
        this.id = id;
        this.types = types;
        this.baseStats = baseStats;
        this.abilities = abilities;
        this.spriteUrl = spriteUrl;
        // Modifiable data
        this.ivs = this.getInitMaxIvs(baseStats);
        this.evs = this.getInitZeroEvs(baseStats);
        this.level = this.getInitMaxLevel();
        this.stats = this.getInitStats(
          baseStats, this.ivs, this.evs, this.level, this.POKEMON_DEFAULT_NATURE_MULT);
    }

    public setIv(statName: string, iv: number): void {
        if(iv > this.POKEMON_MAX_IV || iv < this.POKEMON_MIN_IV) {
            return;
        }
        this.ivs[statName] = iv;
    }

    private getInitMaxIvs(baseStats: Record<string, number>): Record<string, number> {
        const maxIvs: Record<string, number> = {};
        for (const statName in baseStats) {
            maxIvs[statName] = this.POKEMON_MAX_IV;
        }
        return maxIvs;
    }

    public setEv(statName: string, ev: number): void {
        if(this.calculateTotalEvs() - this.evs[statName] + ev >= this.POKEMON_MAX_TOTAL_EV) {
            return;
        }
        this.evs[statName] = ev;
    }

    private calculateTotalEvs(): number {
        let totalEvs = 0;
        for (const value of Object.values(this.evs)) {
            totalEvs += value;
        }
        return totalEvs;
    }

    private getInitZeroEvs(baseStats: Record<string, number>): Record<string, number> {
        const zeroEvs: Record<string, number> = {};
        for (const statName in baseStats) {
            zeroEvs[statName] = 0;
        }
        return zeroEvs;
    }

    public setLevel(level: number): void {
        if(level > this.POKEMON_MAX_LEVEL && level < this.POKEMON_MIN_LEVEL) {
            return;
        }
        this.level = level;
    }

    private getInitMaxLevel(): number {
        return this.POKEMON_MAX_LEVEL;
    }

    private getInitStats(baseStats: Record<string, number>, ivs: Record<string, number>,
                         evs: Record<string, number>, level: number, natureMult: number): Record<string, number> {
        const initStats: Record<string, number> = {};
        for (const statName in baseStats) {
            initStats[statName] = this.calculateStat(
              statName, baseStats[statName], ivs[statName], evs[statName], level, natureMult);
        }
        return initStats;
    }

    /**
     * Formulae from https://pokemon.fandom.com/wiki/Statistics#Formula
     */
    private calculateStat(statName: string, baseStat: number, iv: number, ev: number, level: number, natureMult: number): number {
        if (statName.toLowerCase() === "hp") {
            return Math.floor(0.01 * (2 * baseStat + iv + Math.floor(0.25 * ev)) * level) + level + 10
        }
        return (Math.floor(0.01 * (2 * baseStat + iv + Math.floor(0.25 * ev)) * level) + 5) * natureMult
    }
}
