import { SearchBar } from "./SearchBar.tsx";
import { PokemonCard } from "./PokemonCard.tsx";
import { PokemonParser } from "../utils/PokemonParser.ts";
import { Pokemon } from "../types/Pokemon.ts";
import { useState } from "react";

export function Home() {
  const [pokemon, setPokemon] = useState(Pokemon.EMPTY_POKEMON);

  const handleSearch = async (searchString: string) => {
    const pokemon = await PokemonParser.fetchAndCreatePokemon(searchString);
    setPokemon(pokemon);
  }

  return (
    <>
      <div className="card">
        <SearchBar onSearch={handleSearch}/>
        <PokemonCard pokemon={pokemon} />
      </div>
    </>
  );
}