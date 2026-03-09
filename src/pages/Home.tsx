import { SearchBar } from "../modules/SearchBar.tsx";
import { PokemonCard } from "../modules/PokemonCard.tsx";
import { PokemonParser } from "../utils/PokemonParser.ts";
import { Pokemon } from "../types/Pokemon.ts";
import { useState } from "react";

export function Home() {
  const [clickMessage, setClickMessage] = useState<{
    text: string,
    x: number,
    y: number, } | null>(null);
  const [displayPokemon, setDisplayPokemon] = useState(Pokemon.SEARCH_PROMPT_POKEMON);
  const [pokemonTeam, setPokemonTeam] = useState<Pokemon[]>([
    Pokemon.EMPTY_POKEMON,
    Pokemon.EMPTY_POKEMON,
    Pokemon.EMPTY_POKEMON,
    Pokemon.EMPTY_POKEMON,
    Pokemon.EMPTY_POKEMON,
    Pokemon.EMPTY_POKEMON,
  ]);

  const handleSearch = async (searchString: string) => {
    const pokemon = await PokemonParser.fetchAndCreatePokemon(searchString);
    setDisplayPokemon(pokemon);
  }

  const handleAlreadyInTeam = (e: React.MouseEvent) => {
    setClickMessage({
      text: "Already in team",
      x: e.clientX,
      y: e.clientY
    });

    setTimeout(() => setClickMessage(null), 1200);
  }

  const updateTeamPokemonAt = (idx: number, e: React.MouseEvent) =>{
    for (let i = 0; i < pokemonTeam.length; i++) {
      if (pokemonTeam[i].name === displayPokemon.name) {
        handleAlreadyInTeam(e);
        return;
      }
    }
    setPokemonTeam(pokemonTeam.map((p, i) => i === idx ? displayPokemon : p))
  }



  return (
    <>
      <div className="flex h-screen p-4 gap-4">
        {/* Search bar */}
        <div className="w-1/2">
          <SearchBar onSearch={handleSearch}/>
          <PokemonCard
            pokemon={displayPokemon}
            onChangePokemon={(e) => updateTeamPokemonAt(0, e)}
          />
        </div>

        {/* Pokemon team */}
        <div className="w-1/2 grid grid-cols-3 grid-rows-2 gap-4">
          {pokemonTeam.map((teamPokemon, idx) => (
            <PokemonCard
              key={idx}
              pokemon={teamPokemon}
              onChangePokemon={(e) => updateTeamPokemonAt(idx, e)}
            />
          ))}
        </div>
      </div>
      {clickMessage && (
        <div
          className="fixed text-white bg-black px-3 py-1 rounded pointer-events-none"
          style={{
            left: clickMessage.x,
            top: clickMessage.y
          }}
        >
          {clickMessage.text}
        </div>
      )}
    </>
  );
}