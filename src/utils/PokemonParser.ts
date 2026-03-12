import { Pokemon } from "../types/Pokemon";
import { Ability } from "../types/Ability.ts";
import { Format } from "./Format.ts";
import { Api } from "./Api.ts";

type PokemonApiResponse = {
    name: string,
    game_indices: {
        game_index: number,
    }[],
    types: {
        type: {
            name: string,
            url: string,
        }
    }[],
    stats: {
        base_stat: number,
        stat: {
            name: string,
        }
    }[],
    abilities: {
        ability: {
            name: string,
            url: string,
        },
        is_hidden: boolean,
    }[],
    sprites: {
        front_default: string,
    },
};

type AbilityDescApiResponse = {
    effect_entries: {
        effect: string,
        short_effect: string,
        language: {
            name: string,
            url: string,
        }
    }[];
}

export class PokemonParser {
    private static readonly USER_LANGUAGE = "en";
    private static readonly POKEMON_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

    static async fetchAndCreatePokemon(urlName: string): Promise<Pokemon> {
        const pokeUrl = this.POKEMON_ENDPOINT + urlName.toLowerCase();
        const pokeJson: PokemonApiResponse = await Api.fetchAndJsonOrNull(pokeUrl);
        if (pokeJson == null) {
            return Pokemon.ERROR_POKEMON;
        }

        const name = Format.capitalizeFirst(pokeJson.name);
        const id = pokeJson.game_indices[0].game_index;
        const types = this.getTypes(pokeJson);
        const baseStats = this.getBaseStats(pokeJson);
        const abilities = await this.getAbilities(pokeJson);
        const spriteUrl = pokeJson.sprites.front_default;

        return new Pokemon(name, id, types, baseStats, abilities, spriteUrl);
    }

    private static getTypes(pokeJson: PokemonApiResponse): string[] {
        return pokeJson.types.map(type => Format.capitalizeFirst(type.type.name));
    }

    private static getBaseStats(pokeJson: PokemonApiResponse): Record<string, number> {
        const baseStats: Record<string, number> = {};
        for (let i = 0; i < pokeJson.stats.length; i++) {
            const statJson = pokeJson.stats[i];
            baseStats[Format.capitalizeEachFirst(statJson.stat.name.replace('-', ' '))] = statJson.base_stat;
        }
        return baseStats;
    }

    private static async getAbilities(pokeJson: PokemonApiResponse): Promise<Ability[]> {
        const abilities: Ability[] = [];

        for (let i = 0; i < pokeJson.abilities.length; i++) {
            abilities.push(await this.getAbility(pokeJson, i));
        }
        return abilities;
    }

    private static async getAbility(pokeJson: PokemonApiResponse, idx: number): Promise<Ability> {
        const abilityJson = pokeJson.abilities[idx];

        const name = Format.capitalizeFirst(abilityJson.ability.name);
        const isHidden = abilityJson.is_hidden;
        let effect = "";
        let shortEffect = "";
        const abilityDescJson: AbilityDescApiResponse = await Api.fetchAndJsonOrNull(abilityJson.ability.url);

        if (abilityDescJson == null) {
            return Ability.getErrorAbility(name, isHidden);
        }

        for (const desc of abilityDescJson.effect_entries) {
            if (desc.language.name == this.USER_LANGUAGE) {
                shortEffect = Format.capitalizeFirst(desc.short_effect);
                effect = Format.capitalizeFirst(desc.effect);
                break;
            }
        }
        return new Ability(name, isHidden, shortEffect, effect)
    }
}