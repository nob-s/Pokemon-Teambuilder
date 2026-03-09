import React, { useState } from "react";

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

  return (
    <input
      type="text"
      placeholder="Enter Pokémon name"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyPress}
      className="border p-1 rounded w-full"
    />
  );
};