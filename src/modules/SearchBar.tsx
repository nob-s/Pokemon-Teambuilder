import React, { useState } from "react";
import { PokeCache } from "../utils/PokeCache.ts";

interface SearchBarProps {
  onSearch: (searchString: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
  const [input, setInput] = useState("");

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      onSearch(input.trim().toLowerCase());
      setInput("");
    }
  };

  const suggestions = PokeCache.pokemonNameCache
    .filter(name =>
      name.toLowerCase().includes(input.toLowerCase())
      && input !== "")

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Enter Pokémon name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        className="border rounded w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full border bg-white max-h-40 overflow-y-auto">
          {suggestions.map((name) => (
            <li
              key={name}
              className="p-1 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onSearch(name.toLowerCase());
                setInput("");
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};