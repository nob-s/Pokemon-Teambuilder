import { SearchBar } from "../modules/SearchBar.tsx";
import { PokemonCard } from "../modules/pokemonModules/PokemonCard.tsx";
import { PokemonParser } from "../utils/PokemonParser.ts";
import { Pokemon } from "../types/Pokemon.ts";
import { useState } from "react";
import { PokemonDisplay } from "../modules/pokemonModules/PokemonDisplay.tsx";
import { AlreadyInTeamMessage } from "../modules/clickMessageModules/AlreadyInTeamMessage.tsx";
import { TeamSummaryBox } from "../modules/TeamSummaryBox.tsx";

export function Home() {
  const [clickMessage, setClickMessage] = useState<{
    text: string,
    x: number,
    y: number, } | null>(null);
  const [displayPokemon, setDisplayPokemon] = useState(Pokemon.SEARCH_PROMPT_POKEMON);

  const [pokemonTeam, setPokemonTeam] = useState<Pokemon[]>(
    Array(6).fill(Pokemon.EMPTY_POKEMON));
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
    if(displayPokemon === Pokemon.SEARCH_PROMPT_POKEMON || displayPokemon === Pokemon.ERROR_POKEMON){
      return;
    }
    for (let i = 0; i < pokemonTeam.length; i++) {
      if (pokemonTeam[i].name === displayPokemon.name) {
        handleAlreadyInTeam(e);
        return;
      }
    }

    const newTeam = pokemonTeam.map(
      (p, i) => i === idx ? displayPokemon : p)
    setPokemonTeam(newTeam)
  }

  const deleteTeamPokemonAt = (idx: number) => {
    if (pokemonTeam[idx] === Pokemon.EMPTY_POKEMON) {
      return;
    }
    setPokemonTeam(pokemonTeam.map(
      (p, i) => i === idx ? Pokemon.EMPTY_POKEMON : p))
  }

  return (
    <>
      <div className="flex h-screen p-4 gap-4 font-pokemon text-2xl">
        {/* Search bar */}
        <div className="flex flex-col w-1/2 h-full space-y-12">
          <div className="flex-3 flex-col min-h-0">
            <SearchBar onSearch={handleSearch}/>
            <PokemonDisplay pokemon={displayPokemon}/>
          </div>
          <div className="flex-1 min-h-0">
            <TeamSummaryBox pokemonTeam={ pokemonTeam }/>
          </div>
        </div>
        {/* Pokemon team */}
        <div className="w-1/2 grid grid-cols-3 grid-rows-2 gap-4">
          {pokemonTeam.map((teamPokemon, idx) => (
            <PokemonCard
              key={idx}
              pokemon={teamPokemon}
              onChangePokemon={(e) => updateTeamPokemonAt(idx, e)}
              onDeletePokemon={() => deleteTeamPokemonAt(idx)}
            />
          ))}
        </div>
      </div>
      {clickMessage && (
        <AlreadyInTeamMessage clickMessage={clickMessage}/>
      )}
    </>
  );
}