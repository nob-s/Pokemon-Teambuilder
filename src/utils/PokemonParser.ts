import { Pokemon } from "../types/Pokemon";
import { Ability } from "../types/Ability.ts";

type PokemonApiResponse = {
    name: string,
    id: number,
    types: string[],
    abilities: {
        ability: {
            name: string,
            url: string,
        },
        is_hidden: boolean,
    }[],
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
        const pokeJson = await this.fetchAndJsonOrNull(pokeUrl);
        if (pokeJson == null) {
            return Pokemon.ERROR_POKEMON;
        }
        const name = pokeJson.name;
        const id = pokeJson.id;
        const types = pokeJson.types;
        const abilities = await this.getAbilities(pokeJson);

        return new Pokemon(name, id, types, abilities);
    }

    private static async getAbilities(pokeJson: PokemonApiResponse): Promise<Ability[]> {
        const abilities: Ability[] = [];

        for (const ability of pokeJson.abilities) {
            const name = ability.ability.name;
            const isHidden = ability.is_hidden;
            let effect = "";
            let shortEffect = "";
            const abilityDescJson: AbilityDescApiResponse = await this.fetchAndJsonOrNull(ability.ability.url);

            if (abilityDescJson == null) {
                abilities.push(Ability.getErrorAbility(name, isHidden));
                continue;
            }

            for (const desc of abilityDescJson.effect_entries) {
                if (desc.language.name == this.USER_LANGUAGE) {
                    effect = desc.effect;
                    shortEffect = desc.short_effect;
                }
            }
            abilities.push(new Ability(name, isHidden, effect, shortEffect));
        }
        return abilities;
    }

    private static async fetchAndJsonOrNull(url: string) {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                return null;
            }
            return await res.json()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch(err) {
            return null;
        }
    }
}