import React from "react";

interface PokemonPokeballDisplayProps {
  spriteUrl: string;
}

export const PokemonPokeballDisplay: React.FC<PokemonPokeballDisplayProps> = ({ spriteUrl }) => {
  return (
    <div className="relative w-64 h-64 rounded-full border-4 border-black overflow-hidden shadow-lg">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
      <img
        src={spriteUrl}
        className="relative w-full h-full object-contain z-10"
      />
      <div className="absolute top-1/2 left-0 w-full h-3 bg-black"></div>
    </div>
  );
};